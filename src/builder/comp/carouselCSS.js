const carouselCSS = `
.carousel {
    position: relative;
    max-width: 95%;
    overflow: hidden;
    margin: auto;
  }
  
  .carousel-inner {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  
  .carousel-item {
    box-sizing: border-box;
    padding: 0 12px;
  }
  
  .carousel-item img {
    width: 100%;
    min-height: 220px;
    object-fit: cover;
    border-radius: 6px;
  }
  
  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #000;
    color: #fff;
    border: none;
    padding: 12px 16px;
    cursor: pointer;
    border-radius: 50%;
    z-index: 1;
  }
  
  .carousel-control:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  .carousel-control.enable {
    opacity: 1;
  }
  
  .prev {
    left: 0;
  }
  
  .next {
    right: 0;
  }
`
export default carouselCSS;