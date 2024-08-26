import React from 'react';
import ReactDOM from 'react-dom/client';
import Carousel from '../comp/Carousel';

const sliderItem = [
    { id: 1, imgSrc: "https://shorturl.at/q00le" },
    { id: 2, imgSrc: "https://shorturl.at/TaYPg" },
    { id: 3, imgSrc: "https://shorturl.at/WKMhn" },
    { id: 4, imgSrc: "https://shorturl.at/Nj76k" },
    { id: 5, imgSrc: "https://shorturl.at/RBRgw" },
    { id: 6, imgSrc: "https://shorturl.at/pK9XT" },
    { id: 7, imgSrc: "https://rb.gy/9qwwgm" },
    { id: 8, imgSrc: "https://rb.gy/krs7ph" },
    { id: 9, imgSrc: "https://rb.gy/vjpoui" },
];


const carouselPlugin = (editor) => {

    // Define the Carousel Block in BlockManager panel
    editor.BlockManager.add('carousel', {
        label: `
                <div>
                <img src="https://shorturl.at/Dkq6a" alt="Carousel" style="width: 70%; height: auto; display: block; margin: 0 auto 5px">
                Carousel
                </div>
            `,
        category: 'Basic',
        content: {
            type: 'carousel',
            components: `
                        <div class="carousel-container">
                        <div class="carousel" data-gjs-type="carousel"></div>
                        </div>
                    `,
        },
    });


    editor.DomComponents.addType('carousel', {
        model: {
            // Specifies default settings for the carousel component.
            defaults: {
                tagName: 'div',
                droppable: false,
                resizable: true,
                stylable: true,
                traits: [
                    {
                        type: 'checkbox',
                        label: 'Show Icon:',
                        name: 'showArrows',
                        changeProp: 1,
                    },
                    {
                        type: 'select',
                        label: 'Mobile:',
                        name: 'slidesToShowMobile',
                        options: [
                            { value: '1', name: '1 Slide' },
                            { value: '2', name: '2 Slides' },
                        ],
                        changeProp: 1,
                    },
                    {
                        type: 'select',
                        label: 'Tablet:',
                        name: 'slidesToShowTablet',
                        options: [
                            { value: '1', name: '1 Slide' },
                            { value: '2', name: '2 Slides' },
                            { value: '3', name: '3 Slides' },
                            { value: '4', name: '4 Slides' }
                        ],
                        changeProp: 1,
                    },
                    {
                        type: 'select',
                        label: 'Desktop:',
                        name: 'slidesToShowDesktop',
                        options: [
                            { value: '1', name: '1 Slide' },
                            { value: '2', name: '2 Slides' },
                            { value: '3', name: '3 Slides' },
                            { value: '4', name: '4 Slides' },
                            { value: '5', name: '5 Slides' },
                            { value: '6', name: '6 Slides' }
                        ],
                        changeProp: 1,
                    }
                ],
                showArrows: true,
                slidesToShowMobile: '1',
                slidesToShowTablet: '2',
                slidesToShowDesktop: '4',
            },
            // Initializes the component and sets up event listeners.
            init() {
                this.on('change:showArrows change:slidesToShowMobile change:slidesToShowTablet change:slidesToShowDesktop', this.updateCarousel);
            },

            // Updates the carousel component based on the current trait values.
            updateCarousel() {
                const el = this.view.el.querySelector('.carousel');
                const showArrows = this.get('showArrows');
                const slidesToShowMobile = parseInt(this.get('slidesToShowMobile'), 10);
                const slidesToShowTablet = parseInt(this.get('slidesToShowTablet'), 10);
                const slidesToShowDesktop = parseInt(this.get('slidesToShowDesktop'), 10);

                if (el) {
                    const root = ReactDOM.createRoot(el);
                    root.render(
                        <Carousel settings={{
                            showArrows,
                            responsive: {
                                mobile: slidesToShowMobile,
                                tablet: slidesToShowTablet,
                                desktop: slidesToShowDesktop,
                            }
                        }}>
                            {
                                sliderItem.map((slider) =>
                                    <div key={slider.id}>
                                        <img src={slider.imgSrc} alt="img" />
                                    </div>
                                )
                            }
                        </Carousel>
                    );

                } else {
                    console.error('Element not found for carousel component');
                }
            },
        },

        // Defines how the component is rendered and interacted with.
        view: {
            onRender() {
                this.model.updateCarousel();
            },
        }
    });
};

export default carouselPlugin;
