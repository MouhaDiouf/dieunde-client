const { validateProductHelper } = require('../api/adminapi');
export const PRODUCT_VALIDATE_SUCCESS = 'PRODUCT_VALIDATE_SUCCESS';
export const VALIDATING_PRODUCT = 'VALIDATING_PRODUCT';
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
