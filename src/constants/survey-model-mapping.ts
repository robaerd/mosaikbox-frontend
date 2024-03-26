// Define and export all your injection keys here

export interface SurveyModel {
  name: string;
  sessionId: string;

}

export const SURVEY_MODEL_MAPPING: Record<string, SurveyModel> = {
  autoMashUpper: {
    name: 'autoMashUpper',
    sessionId: 'amu'
  },
  mosaikboxBare: {
    name: 'mosaikboxBare',
    sessionId: 'mosaikbox-bare'
},
  mosaikboxWithStemRemoval: {
    name: 'mosaikboxWithStemRemoval',
    sessionId: 'mosaikbox-with-stem'
  },
  mosaikboxWithStemRemovalAndContextual: {
    name: 'mosaikboxWithStemRemovalAndContextual',
    sessionId: 'mosaikbox-with-stem-and-contextual'
  },
};

export const allSurveyModels = Object.values(SURVEY_MODEL_MAPPING);
