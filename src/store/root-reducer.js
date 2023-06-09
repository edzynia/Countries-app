import { combineReducers } from 'redux';

import { themeReducer } from './theme/theme-reducer';
import { countriesReducer } from './countries/countries-reducer';
import { controlsReduser } from './controls/controls-reducer';
import { deteilsReducer } from './details/deteils-reducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
  countries: countriesReducer,
  controls: controlsReduser,
  details: deteilsReducer,
});
