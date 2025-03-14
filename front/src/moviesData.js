import React from "react";

const moviesData = [
  {
    title: "Featured Movies",
    movies: [
      {
        title: "Avatar",
        image:
          "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2022/11/AVATAR_THE_WAY_OF_WATER_1SHT_DIGITAL_LOAK_sRGB_V1.jpg",
      },
      {
        title: "Inception",
        image:
          "https://th.bing.com/th/id/OIP.13oim15S0HB_WVU2JUk_sAHaKy?w=115&h=180&c=7&r=0&o=5&pid=1.7",
      },
      {
        title: "Interstellar",
        image:
          "https://th.bing.com/th/id/OIP.8A707ygGKj_-MsgM-gOchgHaKe?rs=1&pid=ImgDetMain",
      },
    ],
  },
  {
    title: "Animated Movies",
    movies: [
      {
        title: "The Lion King",
        image:
          "https://image.tmdb.org/t/p/original/nPe31wxhbvEm09pnJoKEqly8wFM.jpg",
      },
      {
        title: "Spirited Away",
        image:
          "https://th.bing.com/th/id/OIP.LXuLXupOTAlf7535sYvgIgHaLH?rs=1&pid=ImgDetMain.jpg",
      },
      {
        title: "Toy Story",
        image:
          "https://th.bing.com/th/id/OIP.eI70P3pLqoXvi5bMMxag5wHaJ1?rs=1&pid=ImgDetMain.jpg",
      },
    ],
  },
];

const MoviesList = () => {
  return (
    <div style={{ padding: "20px" }}>
      {moviesData.map((category, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <h2>{category.title}</h2>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {category.movies.map((movie, movieIndex) => (
              <div key={movieIndex} style={{ textAlign: "center" }}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{
                    width: "150px",
                    height: "200px",
                    objectFit: "cover", // Hace que las imágenes llenen el contenedor proporcionalmente
                    borderRadius: "10px",
                  }}
                />
                <p style={{ marginTop: "10px" }}>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;

//hecho por Jesus Abraham Romo Montoya