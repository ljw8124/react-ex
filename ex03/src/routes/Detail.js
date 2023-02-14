import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const getMovie = async () => {
    const json = await(
        await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setDetails(json.data.movie);
    setLoading(false);
  }
  useEffect(() => {
    getMovie();
  }, []);

  return (
      <div>
        { loading ? (
            <h1>Loading....</h1>
        ) : (
            <div>
              <img src={details.medium_cover_image} />
              <h1>{details.title_long} ({details.rating})</h1>
              <ul>
                {details.genres.map(genre => <li key={genre}>{genre}</li>)}
              </ul>
              <p>
                {details.description_full}
              </p>
              <h4>{details.date_uploaded}</h4>
            </div>

        )}
      </div>

  )
}

export default Detail;