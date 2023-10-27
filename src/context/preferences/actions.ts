import { getPreferences, updateUserPreferences } from "../../utils/api";
import { PreferencesActionTypes, PreferencesDispatch } from "./types";

export const fetchPreferences = async (dispatch: PreferencesDispatch) => {
  try {
    dispatch({ type: PreferencesActionTypes.FETCH_PREFERENCES_REQUEST });
    const response = await getPreferences();
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: PreferencesActionTypes.FETCH_PREFERENCES_SUCCESS,
      payload: response.preferences,
    });
  } catch (error: any) {
    dispatch({
      type: PreferencesActionTypes.FETCH_PREFERENCES_FAILURE,
      payload: error.message,
    });
  }
}

export const updatePreferences = async (dispatch: PreferencesDispatch, sports: string[], teams: string[]) => {
  try {
    dispatch({ type: PreferencesActionTypes.UPDATE_PREFERENCES_REQUEST });
    const response = await updateUserPreferences(sports, teams);
    if (response.errors) {
      throw new Error(response.errors);
    }
    dispatch({
      type: PreferencesActionTypes.UPDATE_PREFERENCES_SUCCESS,
      payload: response.preferences,
    });
  } catch (error: any) {
    dispatch({
      type: PreferencesActionTypes.UPDATE_PREFERENCES_FAILURE,
      payload: error.message,
    });
  }
}