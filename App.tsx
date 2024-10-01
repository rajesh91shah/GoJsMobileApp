/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { WebView } from 'react-native-webview';

const App = () => {
  


  const jsonData = [
    {
      "key": 1,
      "name": "Rajesh\n \n Table1",
      "category": "RoundTable",
      "color": "lightgreen",
      "pos": "-490 -190"
    },
    {
      "key": 2,
      "name": "Round Table 2",
      "category": "RoundTable",
      "color": "lightgreen",
      "pos": "-490 -100"
    },
    {
      "key": 3,
      "name": "Round Table 3",
      "category": "RoundTable",
      "color": "lightgray",
      "pos": "-490 -10"
    },
    {
      "key": 4,
      "name": "Round Table4",
      "category": "RoundTable",
      "color": "lightgray",
      "pos": "-490 80"
    },
    {
      "key": 5,
      "name": "Rectangle Table 1",
      "category": "RectangleTable",
      "color": "lightgray",
      "pos": "-290 0"
    },
    {
      "key": 6,
      "name": "Rectangle Table 2",
      "category": "RectangleTable",
      "color": "lightgray",
      "pos": "-290 -90"
    },
    {
      "key": 7,
      "name": "Rectangle Table 3",
      "category": "RectangleTable",
      "color": "lightgray",
      "pos": "-290 100"
    },
    {
      "key": 12,
      "name": "Rectangle Table 4",
      "category": "RectangleTable",
      "color": "lightgray",
      "pos": "-10 0"
    },
    {
      "key": 13,
      "name": "Rectangle Table 5",
      "category": "RectangleTable",
      "color": "lightgray",
      "pos": "-10 -90"
    },
    {
      "key": 14,
      "name": "Rectangle Table 6",
      "category": "RectangleTable",
      "color": "lightgray",
      "pos": "-10 100"
    },
    {
      "key": 8,
      "name": "Sofa 1",
      "category": "Sofa",
      "color": "lightgray",
      "pos": "-290 -190"
    },
    {
      "key": 9,
      "name": "Sofa 2",
      "category": "Sofa",
      "color": "lightgray",
      "pos": "-10 -190"
    },
    {
      "key": 10,
      "name": "Bar 1",
      "category": "Bathroom",
      "color": "lightgreen",
      "pos": "250 -100"
    },
    {
      "key": 11,
      "name": "Bar 2",
      "category": "Bathroom",
      "color": "lightgreen",
      "pos": "250 0"
    }
  ];


  let updatedData1 = jsonData.map(item => {
    // if (item.key === one.nodeName.key) {
    //   console.log("in update data")
    //   return { ...item, color: 'lightgreen' }; // Update the color to blue or any other color
    // }
    return item; // Return unchanged items
  });



  const ref = useRef<WebView>(null);

  //Start 
  const callWebPageMethod = () => {
    // JavaScript code to execute inside the web page
    const jsCode = `
      (function() {
        if (typeof window.fetchNodePositions === 'function') {
          window.fetchNodePositions(); // Call the web page's JavaScript function
        } else {
          console.log('Function not found');
        }
      })();
      true; // Always return true to avoid any issues with WebView
    `;

    // Inject JavaScript code into the WebView
    if (ref.current) {
      ref.current.injectJavaScript(jsCode);
    }
  };
  ///end 




  const handleWebViewMessage = (event : any) => {
    const message = event.nativeEvent.data ;
    console.log('Message from WebView:', message);
    
    const one = JSON.parse(message);
    console.log('Message from one nodeName:', one.nodeName);
    console.log('Message from one event:', one.event);
    console.log('Message from one nodename key:', one.nodeName.key);



    const updatedData = updatedData1.map(item => {
      if (item.key === one.nodeName.key) {
        console.log("in update data")
        return { ...item, color: 'lightgreen' }; // Update the color to blue or any other color
      }
      return item; // Return unchanged items
    });
    console.log(jsonData);
    updatedData1 = updatedData;
    console.log(updatedData);


    //// API call 

    const postData = async () => {
      try {
        const response = await fetch('https://ccposapi.onrender.com/api/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData) // Convert JavaScript object to JSON string
        });

        const result = await response.json(); // Assuming the response is JSON
        console.log('Success:', result);

       
        callWebPageMethod()

        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    postData();


    /// Ennd 





    // setData(jsonData);



    //Below is the output:
    
    // Message from WebView: {"event":"click","nodeName":{"key":"Alpha"}}
    // LOG  Message from one nodeName: {"key": "Alpha"}
    // LOG  Message from one event: click
    // LOG  Message from one nodename key: Alpha

    //Link 1 https://66e966c85e1644fddf34b474--zingy-biscuit-233ab7.netlify.app/

    // Link 2 : https://66ea95a111ad09402e61b8a3--incredible-sopapillas-f26c11.netlify.app/
    
  };

  
  const injectedJSq = `
    // Add event listener for any element you want to detect click on
    document.addEventListener('click', function(event) {
      var elementId = event.target.id; // Get the id of the clicked element
      if (elementId) {
        window.ReactNativeWebView.postMessage('Clicked element with id: ' + event);
      } else {
       let elementText = this.innerText || this.textContent || this.outerHTML; 
        window.ReactNativeWebView.postMessage('Element clicked: ' + elementText);
        
      }
    });
  `;
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <WebView ref={ref}
                 source={
                  //https://66fb9e59765445cfcb646571--sparkly-smakager-c1a6f2.netlify.app
                  {uri: 'https://66fb9e59765445cfcb646571--sparkly-smakager-c1a6f2.netlify.app'}
               
                  // {uri: 'https://66ea95a111ad09402e61b8a3--incredible-sopapillas-f26c11.netlify.app/'}
                } 
                 onMessage={handleWebViewMessage}
                  />

                  
      </SafeAreaView>
    </>
  );
  
};

export default App;
//https://gojs.net/latest/samples/warehouse.html