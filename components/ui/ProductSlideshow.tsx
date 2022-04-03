import { FC } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

interface Props {
    images: string[]
}

export const ProductSlideshow: FC<Props> = ({images}) => {
  return (
    <Splide
        options={{
            type: 'slide',
            rewind: false,
            perPage: 1,
            gap: '0px',
            height: '100%',
            width: '750px',
            speed: 600,
            breakpoints: {
                800: {
                    width: '100%',
                }
            }
        }}
    >
        {images.map((image) => (
            <SplideSlide key={image}>
                <div style={{
                    backgroundImage: `url(/products/${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '650px',
                }}>
                </div>
            </SplideSlide>
        ))}
    </Splide>
  )
}