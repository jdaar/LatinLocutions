import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLocution, favLocution, RootState } from './redux/store';
import { ILocution } from './redux/types';

function App() {
  const locutions = useSelector((state: RootState) => state.locutions)
  const dispatch = useDispatch()

  const newLoc: ILocution = {
    locution: 'Alea jacta est',
    meaning: 'La suerte esta echada',
    fav: true
  }

  const add = useCallback(() => {
    dispatch(addLocution(newLoc))
  }, [dispatch, newLoc])

  const fav = useCallback(() => {
    dispatch(favLocution('Alea jacta est'))
  }, [dispatch])

  console.log(locutions)
  return (
    <div className="App">
      <button onClick={add}>Alea jacta est</button>
      {locutions.map((v, i) => 
        <li key={i}>{v.locution} - {v.meaning} <input type="checkbox" checked={v.fav} onChange={fav}></input> </li>
      )}
    </div>
  );
}

export default App;
