const {
  validateProductHelper,
  addToSelectionHelper,
} = require('../api/adminapi');
export const PRODUCT_VALIDATE_SUCCESS = 'PRODUCT_VALIDATE_SUCCESS';
export const VALIDATING_PRODUCT = 'VALIDATING_PRODUCT';
export const ADDING_TO_SELECTION = 'ADDING_TO_SELECTION';
export const ADD_TO_SELECTION_SUCCESS = 'ADD_TO_SELECTION_SUCCESS';
export const validateProduct = (id) => async (dispatch) => {
  dispatch({
    type: VALIDATING_PRODUCT,
  });
  try {
    const { data } = await validateProductHelper(id);
    dispatch({
      type: PRODUCT_VALIDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addToSelection = (id) => async (dispatch) => {
  dispatch({
    type: ADDING_TO_SELECTION,
  });

  try {
    const { data } = await addToSelectionHelper(id);
    if ((data.status = 'added')) {
      dispatch({
        type: ADD_TO_SELECTION_SUCCESS,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
