import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import Markdown from 'react-markdown';
import useSWR from 'swr';
import Slider from "react-slick";
import Link from 'next/link';


function fetcher(url) {
  return fetch(url).then(r => r.json());
}

export default function Project() {
  const { query } = useRouter();
  const { data, error } = useSWR(`/api/project?title=${encodeURI(query.name)}`, fetcher);

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const project = data;

  if (!data) {
    return (
      <div id="project-container">
        <p>Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div id="project-container">
        <p>Error Loading the Project...</p>
      </div>
    );
  } else {
    return (
      <div id="project-container">

        <Link href="/archive">
          <a>Back</a>
        </Link>        
        <h1>{project.title}</h1>

        <Slider {...carouselSettings}>
          <div>
            <ReactPlayer className="slider-video" url={project.video.url} playing />
            <p>{project.video.caption}</p>
          </div>
          {project.images.map(img=> (
            <div key={img.url}>
              <img className="slider-img" src={img.url}></img>
              <p>{img.caption}</p>
            </div>
          ))}
        </Slider>

        <div id="text-frame">
          <Markdown source={project.text.body} />
        </div>

        <div>{project.text.body}</div>
          <style  jsx>{`
            .slick-slider .slick-initialized {
              width: 100%;
              max-height: 40vh;
              background: black;
            }

            .slider-img, .slider-video {
              max-height: 50vh;
            }

            h1, h2, h3 {
              padding: 0.5em;
            }

            #text-frame {
              padding: 1em;
            }
            
            #project-container {
              padding: 0px;
              overflow: hidden;
            }



          `}</style>
      </div>
    );
  }
}