import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

//Plugins imports
import carouselPlugin from './plugin/carouselPlugin';


const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    const editor = grapesjs.init({
      container: editorRef.current,
      fromElement: true,
      deviceManager: {
        devices: [
          { name: 'desktop', width: '' }
        ]
      },
      modules: [],
      plugins: [carouselPlugin],
      pluginsOpts: {
        carouselPlugin: {}
      }
    });

    return () => editor.destroy();
  }, []);

  return <div ref={editorRef} style={{ height: '100vh' }} />;
};

export default GrapesEditor;
