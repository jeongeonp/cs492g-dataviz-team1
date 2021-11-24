export const CHANGE_ACTIVATION = 'CHANGE_ACTIVATION'

export const change_activation = ({physical, mental, social}) => ({
    type: CHANGE_ACTIVATION,
    payload: {physical, mental, social}
})

const initialActivatedElements = {
    physical: {
      Calories: true,
      Pedometer: true,
    },
    mental: {
      Valence: true,
      Arousal: true,
      Attention: true,
      Stress: true,
    }, 
    social: {
      CallLog: true,
      MessageLog: true,
      SNSProp: true,
    }
};
  
const activation = (state = initialActivatedElements, action) => {
    switch (action.type) {
        case CHANGE_ACTIVATION:
            return {
                ...state,
                physical: payload.physical,
                mental: payload.mental,
                social: payload.social,         
            }
        default:
            return state;
    }
};

export default activation;