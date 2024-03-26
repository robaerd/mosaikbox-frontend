import {allSurveyModels, SURVEY_MODEL_MAPPING, SurveyModel} from "@/constants/survey-model-mapping";
import {getSongSchedule} from "@/services/mixService";
import path from "node:path";
import {list} from "postcss";
import {SongScheduleItemDto} from "@/dtos/SongScheduleItemDto";

export const generateSurvey = async () => {
  return {
    "completeText": "Finish",
    "pageNextText": "Continue",
    "pagePrevText": "Previous",
    "pages": await generateSurveyPagesRandomOrder(),
    "requiredText": "",
    "showQuestionNumbers": "off",
    "storeOthersAsComment": false,
  };
}

const storageSurveyOrderKey = 'surveyOrder';

function getFileNameWithNewExtension(filePath: string, newExtension: string): string {
  const parts = filePath.split('/');
  const fileName = parts[parts.length - 1];
  const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.');
  return `${nameWithoutExtension}.${newExtension}`;
}

function saveSurveyOrder (surveyModels: SurveyModel[]) {
  window.localStorage.setItem(storageSurveyOrderKey, JSON.stringify(surveyModels));
}

function getSurveyOrder(): SurveyModel[] {
  const surveyOrderString = window.localStorage.getItem(storageSurveyOrderKey);
  if (surveyOrderString) {
    return JSON.parse(surveyOrderString);
  }
  return allSurveyModels;
}

function isSurveyOrderSaved(): boolean {
  return window.localStorage.getItem(storageSurveyOrderKey) !== null;
}

export const clearSurveyOrder = () => {
  window.localStorage.removeItem(storageSurveyOrderKey);
}

const generateSurveyPagesRandomOrder = async () => {
  let surveyModels: SurveyModel[];
  if (isSurveyOrderSaved()) {
    surveyModels = getSurveyOrder();
    console.debug('using saved survey order', surveyModels)
  } else {
    surveyModels = allSurveyModels;
    surveyModels = surveyModels.sort(() => Math.random() - 0.5);
    console.debug('shuffled survey models', surveyModels)
    saveSurveyOrder(surveyModels);
  }

  const surveyElements = [];
  surveyElements.push(createIntroductoryQuestion())
  surveyElements.push(createGeneralKnowledgeQuestion())

  let isBareOrStemOnlyAlreadyPresent = false; // remove duplicate single song listening questions

  function createSongListentingQuestions(songSchedule: SongScheduleItemDto[], surveyModel: SurveyModel, modelIndex: number, sessionId: string) {
    songSchedule.forEach((songScheduleItem, songIndex) => {
      if (songIndex < songSchedule.length - 1) {
        const currentSongName = getFileNameWithNewExtension(songScheduleItem.audio_path, 'mp3');
        const nextSongName = getFileNameWithNewExtension(songSchedule[songIndex + 1].audio_path, 'mp3');
        // we store it at mosaikboxBare sessionId
        const question = createTwoSongListeningQuestion(currentSongName, nextSongName, songIndex, sessionId, surveyModel.name, modelIndex);
        surveyElements.push(question);
      }
    })
  }

  for (const surveyModel of surveyModels) {
    const modelIndex = surveyModels.indexOf(surveyModel);
    const songSchedule = await getSongSchedule(surveyModel.sessionId);
    console.debug('songSchedule', songSchedule)
    if ((surveyModel.name === 'mosaikboxBare' || surveyModel.name === 'mosaikboxWithStemRemoval') && !isBareOrStemOnlyAlreadyPresent) {
      // we label it as mosaikboxBare so we only have to store the results once (and not twice for mosaikboxBare and mosaikboxWithStemRemoval)
      createSongListentingQuestions(songSchedule, SURVEY_MODEL_MAPPING.mosaikboxBare, modelIndex, SURVEY_MODEL_MAPPING.mosaikboxBare.sessionId);
      isBareOrStemOnlyAlreadyPresent = true;
    } else if (!(surveyModel.name === 'mosaikboxBare' || surveyModel.name === 'mosaikboxWithStemRemoval')) {
      createSongListentingQuestions(songSchedule, surveyModel, modelIndex, surveyModel.sessionId);
    }
    const transitionRatingQuestion = createTransitionRatingQuestion(surveyModel.sessionId, surveyModel.name, modelIndex);
    surveyElements.push(transitionRatingQuestion);
  }
  surveyElements.push(createEmailQuestion())
  return surveyElements;
}


const createIntroductoryQuestion = () => {
  return {
    "elements": [
      {
        "type": "panel",
        "elements": [
          {
            "type": "html",
            "name": "study_intro",
            "html": "<article class='intro'><h4 class='intro__heading intro__heading--income title'>Auto-Mixing Survey</h4><div class='intro__body wysiwyg'><p>The goal of this survey is to assess which of the four auto-mixing algorithms creates the most pleasant mixes.</p> <br/> <p>The questionnaire is structured as follows: You will be presented with 4 mixes generated from the same dataset. These mixes all start with the same song, and depending on the type of algorithm, either schedule songs differently or alter how the two tracks are mixed together.</p> <br/> <p>For each mix, you will have to rate two aspects:</p> <ul> <li>- Briefly listen to each song that the models have mixed together separately and assess the compatibility of these tracks.</li> <li>- Rate the transitions of the generated mix.</li> </ul> <br/>For the most pleasing experience during this survey, please use Chrome or Firefox as your browser.</div></article>"
          }
        ],
        "name": "panel_intro"
      }
    ],
    "name": "page_intro",
  }
}

const createGeneralKnowledgeQuestion = () => {
  return {
    "name": "page_self_assessment",
    "title": "Self Assessment: Musical Knowledge and Experience",
    "elements": [
      {
        "type": "radiogroup",
        "name": "question_rate_music_knowledge",
        "title": "How would you rate your own musical knowledge",
        "choices": [
          "Novice: Little to no understanding of music theory / musical terms",
          "Intermediate: Basic knowledge in music theory / musical terms",
          "Advanced: Deep understanding of music theory and proficient in musical terms and concepts.",
          "Expert: I have a comprehensive and detailed understanding of music (formal education, professional experience)",
        ],
        "isRequired": true,
      },
      {
        "type": "radiogroup",
        "name": "question_has_experience_djing",
        "title": "Do you have experience in DJing?",
        "choices": [
          "Yes",
          "No"
        ],
        "isRequired": true,
      },
    ]
  }
}

const createTransitionRatingQuestion = (sessionId: string, model: string, modelNumber: number) => {
  return {
    "name": `page_rate_transition_${model}`,
    "elements": [
      {
        "type": "matrix",
        "name": `question_rate_transition_${model}`,
        "title": "Rate the transitions of the mix",
        "description": "You can quickly navigate through all transitions by tapping on the song segment in the mix timeline.",
        "isRequired": true,
        "isAllRowRequired": true,
        "alternateRows": true,
        "columns": [
          {
            "value": 1,
            "text": "1 (awful)"
          },
          {
            "value": 2,
            "text": "2 (poor)"
          },
          {
            "value": 3,
            "text": "3 (fair)"
          },
          {
            "value": 4,
            "text": "4 (good)"
          },
          {
            "value": 5,
            "text": "5 (excellent)"
          }
        ],
        "rows": [
          {
            "value": "transition_1",
            "text": "Transition 1"
          },
          {
            "value": "transition_2",
            "text": "Transition 2"
          },
          {
            "value": "transition_3",
            "text": "Transition 3"
          },
          {
            "value": "transition_4",
            "text": "Transition 4"
          },
          {
            "value": "transition_5",
            "text": "Transition 5"
          },
          {
            "value": "transition_6",
            "text": "Transition 6"
          },
          {
            "value": "transition_7",
            "text": "Transition 7"
          }
        ]
      }
    ],
    "sessionId": sessionId,
    "isSchedulePage": true,
    "modelNum": modelNumber
  }
}

const createEmailQuestion = () => {
  return {
    "name": "page_email",
    "elements": [
      {
        "name": "question_email",
        "title": "If you wish to receive the results of this study, please enter your email address below. (optional)",
        "type": "text",
        "validators": [
          {"type": "email", "text": "Must be a valid email"}
        ]
      }
    ]
  }
}

const createTwoSongListeningQuestion = (song1: string, song2: string, transitionNum: number, sessionId: string, model: string, modelNumber: number) => {
  return {
    "elements": [
      {
        "type": "matrix",
        "name": `question_song_compatability_${model}_${transitionNum}`,
        "title": "Please indicate if you agree or disagree with the following statements",
        "description": "Listen briefly to the two songs and assess the similarity of the two songs.",
        "columns": [{
          "value": 1,
          "text": "Agree"
        }, {
          "value": 0,
          "text": "Disagree"
        }],
        "rows": [
          {
            "value": "timbre",
            "text": "The two songs are similar in timbre"
          },
          {
            "value": "rhythm",
            "text": "The two songs have a similar rhythmic pattern"
          },
          {
            "value": "harmony",
            "text": "The two songs have a similar harmony"
          },
          {
            "value": "mixable",
            "text": "The two songs are overall mixable"
          }
        ],
        "alternateRows": true,
        "isAllRowRequired": true
      }
    ],
    "name": `page_song_compatability_${model}_${transitionNum}`,
    "sessionId": sessionId,
    "songName1": song1,
    "songName2": song2,
    "modelNum": modelNumber
  };
}
