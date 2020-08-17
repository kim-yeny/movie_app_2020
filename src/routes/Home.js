import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoaing: true,
    movies: [], // state 변수 - 동명 헷갈리지말 것
  };

  getMovies = async () => {
    // 구조 분해 할당을 이용한 movies 키 접근
    const {
      data: {
        data: { movies }, // axios.get을 담은 변수 - 동명 헷갈리지말 것
      },

      // axios.get() 실행 예정 - 반환 결과를 movies에 저장
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json?sort_by=rating");
    // async: JS에게 getMovies() 함수는 시간이 필요하다고
    // await: axios.get() 실행을 기다려달라고 말하는 것
    // 이 둘은 짝꿍이고, 동시에 사용해야 한다

    // movies state에 데이터 저장
    // this.setState({ movies: movies }) 키 == 대입할 변수명 ? 축약 가능
    console.log(movies);
    this.setState({ movies, isLoaing: false });
  }

  // 영화 데이터 로딩
  componentDidMount() {
    this.getMovies();
  };

  render() {
    // 구조 분해 할당으로 state 객체를 상수로 선언
    const { isLoaing, movies } = this.state;

    // 로딩 - 영화 데이터 출력
    return (
      <section className="container">
        {isLoaing ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
            <div className="movies">
              {movies.map(movie => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                  rating={movie.rating}
                />
              ))}
            </div>
          )}
      </section>
    );
  };
}

export default Home;