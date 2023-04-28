import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import {
  selectCountriesAll,
  selectCountriesInfo,
  selectSearchCountries,
} from '../store/countries/countries-selectors';
import { fetchCountries } from '../store/countries/countries-actions';
import { setSearch } from '../store/controls/controls-actions';
import { selectAllControls } from '../store/controls/controls-selectors';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { search, region } = useSelector(selectAllControls);

  const countries = useSelector((state) =>
    selectSearchCountries(state, { search, region }),
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!qty) {
      dispatch(fetchCountries());
    }
  }, [dispatch, qty]);

  return (
    <>
      <Controls />
      {error && <h2>Cannot fetch data</h2>}
      {status === 'loading' && <h2>Loading...</h2>}
      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital,
                },
              ],
            };

            return (
              <Card
                key={c.name}
                onClick={() => navigate(`/country/${c.name}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
