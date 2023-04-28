export const SET_COUNTRIES = '@@country/SET_COUNTRIES';
export const SET_LOADING = '@@country/SET_LOADING';
export const SET_ERROR = '@@country/SET_ERROR';

export const setCountries = (countries) => ({
  type: SET_COUNTRIES,
  payload: countries,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const fetchCountries =
  () =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());

    client
      .get(api.ALL_COUNTRIES)
      .then(({ data }) => dispatch(setCountries(data)))
      .catch((error) => dispatch(setError(error.message)));
  };
