// export const surveyJson = {
//   "completeText": "Finish",
//   "pageNextText": "Continue",
//   "pagePrevText": "Previous",
//   "pages": [
//     {
//       "elements": [
//         {
//           "type": "panel",
//           "elements": [
//             {
//               "type": "html",
//               "name": "study_intro",
//               "html": "<article class='intro'><h4 class='intro__heading intro__heading--income title'>Auto-Mixing Survey</h4><div class='intro__body wysiwyg'><p>The goal of this survey is to assess which of the four auto-mixing algorithms creates the most pleasant mixes.</p> <br/> <p>The questionnaire is structured as follows: You will be presented with 4 mixes generated from the same dataset. These mixes all start with the same song, and depending on the type of algorithm, either schedule songs differently or alter how the two tracks are mixed together.</p> <br/> <p>For each mix, you will have to rate two aspects:</p> <ul> <li>- Briefly listen to each song that the models have mixed together separately and assess the compatibility of these tracks.</li> <li>- Rate the transitions of the generated mix.</li> </ul></div></article>"
//             }
//           ],
//           "name": "panel1"
//         }
//       ],
//       "name": "page0"
//     },
//     {
//       "name": "self_assessment",
//       "title": "Self Assessment: Musical Knowledge and Experience",
//       "elements": [
//         {
//           "type": "radiogroup",
//           "name": "rate_music_knowledge",
//           "title": "How would you rate your own musical knowledge",
//           "choices": [
//             "Novice: Little to no understanding of music theory / musical terms",
//             "Intermediate: Basic knowledge in music theory / musical terms",
//             "Advanced: Deep understanding of music theory and proficient in musical terms and concepts.",
//             "Expert: I have a comprehensive and detailed understanding of music (formal education, professional experience)",
//           ],
//           "isRequired": true,
//         },
//         {
//           "type": "radiogroup",
//           "name": "experience_djing",
//           "title": "Do you have experience in DJing?",
//           "choices": [
//             "Yes",
//             "No"
//           ],
//           "isRequired": true,
//         },
//       ]
//     },
//
//     {
//       "elements": [
//         {
//           "type": "matrix",
//           "name": "song_compatability_1",
//           "title": "Please indicate if you agree or disagree with the following statements",
//           "description": "Listen briefly to the two songs and assess the similarity of the two songs.",
//           "columns": [{
//             "value": 1,
//             "text": "Agree"
//           }, {
//             "value": 0,
//             "text": "Disagree"
//           }],
//           "rows": [
//             {
//               "value": "timbre",
//               "text": "The two songs are similar in timbre"
//             },
//             {
//               "value": "rhythm",
//               "text": "The two songs have a similar rhythmic pattern"
//             },
//             {
//               "value": "harmony",
//               "text": "The two songs have a similar harmony"
//             },
//             {
//               "value": "mixable",
//               "text": "The two songs are overall mixable"
//             }
//           ],
//           "alternateRows": true,
//           "isAllRowRequired": true
//         }
//       ],
//       "name": "page_song_compatability_1",
//       "sessionId": "38081707-e09b-406d-b2af-be4d42a0d5cb",
//       "songName1": "1-08 Flashback.mp3",
//       "songName2": "1-07 champion (Andromedik Remix).mp3",
//     },
//     // {
//     //   "elements": [
//     //     {
//     //       "type": "matrix",
//     //       "name": "song_compatability_2",
//     //       "title": "Please indicate if you agree or disagree with the following statements",
//     //       "description": "Listen briefly to the two songs and assess the similarity of the two songs.",
//     //       "columns": [{
//     //         "value": 1,
//     //         "text": "Agree"
//     //       }, {
//     //         "value": 0,
//     //         "text": "Disagree"
//     //       }],
//     //       "rows": [
//     //         {
//     //           "value": "timbre",
//     //           "text": "The two songs are similar in timbre"
//     //         },
//     //         {
//     //           "value": "rhythm",
//     //           "text": "The two songs have a similar rhythmic pattern"
//     //         },
//     //         {
//     //           "value": "harmony",
//     //           "text": "The two songs have a similar harmony"
//     //         },
//     //         {
//     //           "value": "mixable",
//     //           "text": "The two songs are overall mixable"
//     //         }
//     //       ],
//     //       "alternateRows": true,
//     //       "isAllRowRequired": true
//     //     }
//     //   ],
//     //   "name": "page_song_compatability_2",
//     //   "sessionId": "38081707-e09b-406d-b2af-be4d42a0d5cb",
//     //   "songName1": "1-07 champion (Andromedik Remix).mp3",
//     //   "songName2": "1-06 Cola.mp3",
//     // },
//     // {
//     //   "elements": [
//     //     {
//     //       "type": "matrix",
//     //       "name": "song_compatability_3",
//     //       "title": "Please indicate if you agree or disagree with the following statements",
//     //       "description": "Listen briefly to the two songs and assess the similarity of the two songs.",
//     //       "columns": [{
//     //         "value": 1,
//     //         "text": "Agree"
//     //       }, {
//     //         "value": 0,
//     //         "text": "Disagree"
//     //       }],
//     //       "rows": [
//     //         {
//     //           "value": "timbre",
//     //           "text": "The two songs are similar in timbre"
//     //         },
//     //         {
//     //           "value": "rhythm",
//     //           "text": "The two songs have a similar rhythmic pattern"
//     //         },
//     //         {
//     //           "value": "harmony",
//     //           "text": "The two songs have a similar harmony"
//     //         },
//     //         {
//     //           "value": "mixable",
//     //           "text": "The two songs are overall mixable"
//     //         }
//     //       ],
//     //       "alternateRows": true,
//     //       "isAllRowRequired": true
//     //     }
//     //   ],
//     //   "name": "page_song_compatability_3",
//     //   "sessionId": "38081707-e09b-406d-b2af-be4d42a0d5cb",
//     //   "songName1": "1-06 Cola.mp3",
//     //   "songName2": "1-05 Vibration (One More Time).mp3",
//     // },
//     // {
//     //   "elements": [
//     //     {
//     //       "type": "matrix",
//     //       "name": "song_compatability_4",
//     //       "title": "Please indicate if you agree or disagree with the following statements",
//     //       "description": "Listen briefly to the two songs and assess the similarity of the two songs.",
//     //       "columns": [{
//     //         "value": 1,
//     //         "text": "Agree"
//     //       }, {
//     //         "value": 0,
//     //         "text": "Disagree"
//     //       }],
//     //       "rows": [
//     //         {
//     //           "value": "timbre",
//     //           "text": "The two songs are similar in timbre"
//     //         },
//     //         {
//     //           "value": "rhythm",
//     //           "text": "The two songs have a similar rhythmic pattern"
//     //         },
//     //         {
//     //           "value": "harmony",
//     //           "text": "The two songs have a similar harmony"
//     //         },
//     //         {
//     //           "value": "mixable",
//     //           "text": "The two songs are overall mixable"
//     //         }
//     //       ],
//     //       "alternateRows": true,
//     //       "isAllRowRequired": true
//     //     }
//     //   ],
//     //   "name": "page_song_compatability_4",
//     //   "sessionId": "38081707-e09b-406d-b2af-be4d42a0d5cb",
//     //   "songName1": "1-05 Vibration (One More Time).mp3",
//     //   "songName2": "1-03 Right Now.mp3",
//     // },
//
//
//
//     {
//       "name": "page_rate_transition", // TODO: add model name
//       "elements": [
//         {
//           "type": "matrix",
//           "name": "rate_transition_question", // TODO: add model name
//           "title": "Rate the transitions of the mix",
//           "description": "You can quickly navigate through all transitions by tapping on the song segment in the mix timeline.<br/>" +
//             "When rating the transitions, take following aspects into account: <br/>" +
//             "<ul>   <li>- Rhythm</li>   <li>- Timbre</li>   <li>- Harmony</li> <li>- Overall</li> </ul>",
//           "isRequired": true,
//           "alternateRows": true,
//           "columns": [
//             {
//               "value": 1,
//               "text": "1 (awful)"
//             },
//             {
//               "value": 2,
//               "text": "2 (poor)"
//             },
//             {
//               "value": 3,
//               "text": "3 (fair)"
//             },
//             {
//               "value": 4,
//               "text": "4 (good)"
//             },
//             {
//               "value": 5,
//               "text": "5 (excellent)"
//             }
//           ],
//           "rows": [
//             {
//               "value": "transition_1",
//               "text": "Transition 1"
//             },
//             {
//               "value": "transition_2",
//               "text": "Transition 2"
//             },
//             {
//               "value": "transition_3",
//               "text": "Transition 3"
//             },
//             {
//               "value": "transition_4",
//               "text": "Transition 4"
//             },
//             {
//               "value": "transition_5",
//               "text": "Transition 5"
//             },
//             {
//               "value": "transition_6",
//               "text": "Transition 6"
//             },
//             {
//               "value": "transition_7",
//               "text": "Transition 7"
//             }
//           ]
//         }
//       ],
//       "sessionId": "38081707-e09b-406d-b2af-be4d42a0d5cb",
//       "isSchedulePage": true,
//     },
//     {
//       "name": "page_email",
//       "elements": [
//         {
//           "name": "question_email",
//           "title": "If you wish to receive the results of this study, please enter your email address below. (optional)",
//           "type": "text",
//           "validators": [
//             { "type": "numeric", "text": "Must be a valid email" }
//           ]
//         }
//       ]
//     },
//   ],
//   "requiredText": "",
//   "showQuestionNumbers": "off",
//   "storeOthersAsComment": false,
// };
