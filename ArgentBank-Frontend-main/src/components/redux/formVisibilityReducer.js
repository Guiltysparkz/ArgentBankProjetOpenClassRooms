// Action types
const TOGGLE_EDIT_FORM = 'TOGGLE_EDIT_FORM';

// Action creators
export const toggleEditForm = () => ({
  type: TOGGLE_EDIT_FORM,
});

// Initial state
const initialState = {
  isEditFormVisible: false,
};

// Reducer to flip value
export default function formVisibilityReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_EDIT_FORM:
      return {
        ...state,
        isEditFormVisible: !state.isEditFormVisible,
      };
    default:
      return state;
  }
}
