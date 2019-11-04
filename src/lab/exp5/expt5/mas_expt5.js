// This file contains all general functions used of the experiment
    var images = [];// Two images that are alternated in ordered to get the blinking effect of the spectrophotometer
    images[0] = "images/spec_with_red.png";
    images[1] = "images/spec_with_red.png";
    var x = 0;
    var y = 0;
    // Variables necessary to obtain motion of all the images
    var initial_top;
    var initial_left;
    var final_top;
    var final_left;
    var step;
    var elem;
    var img,img1;
    var id,id1;
    var type_of_movement;// Indicates upward or downward motion
    var turnon; // It is used to store the spectrometer table image.
    var conc_value = 0.02; //indicates the default conc value.
    var step_no=0; /* This variable is used to perform all the actions in the required sequence. 
                      Depending on the value of this variable the part of the method is called.*/
    var count = 0; /* This variable is used to perform the actions on the objects without distortions.
                      i.e., It make sures that one or more actions are not performed at a time. */ 

/*This method is called when the page is loaded. *
   First function helps in providing basic functionality to manual button and also sets the first set of instructions.
   Second function adds click events to elements as soon as the page loads.
   Third function adds mouse events to elements as soon as the page loads. */
window.onload = function(){ 
        initial_function();
        addclickEvents();
        mouseEvents();
}

/*This method is called when the page is loaded. It helps in providing basic functionality to 
manual button and also sets the first set of instructions. */
function initial_function(){
  // Intial intrsuction to be followed
  document.getElementById("demo").innerHTML = "चरण संख्या 1: एक जलीय 1 x 10 <सुप> -3 </ sup> M 2-नाइट्रोनिलिन घोल तैयार करें। सामग्री का 0.0138 ग्राम वजन और 100 मिलीलीटर पानी में घोलें। यह स्टॉक समाधान के रूप में उपयोग किया जाता है। पावर बटन पर क्लिक करने वाले इंस्ट्रूमेंट को चालू करें और इंस्ट्रूमेंट के इनिशियलाइज़ेशन के लिए 30 मिनट तक प्रतीक्षा करें।";
    var modal = document.getElementById('manual');
    // Get the button that opens the manual modal
    var btn = document.getElementById("manual_button");
    // Get the <span> element that closes the manual modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the manual modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/*When user clicks on the Data button it redirects him to the page containing slideshow of three graphs 
obtained from three different sample lengths*/
function popitup(url) {
    // Opens a new browser window called newwindow. url specifies the URL of the page to open.
    newwindow=window.open(url,'name','height=400,width=350',"_parent");
    // Sets focus to the new window if the focus is on the previous page.
    if (window.focus) {
        newwindow.focus()
    }
    return false;
}

//This function is used to add click events to elements
function addclickEvents(){
    document.getElementById("reset_btn").addEventListener("click", function() {
            window.location.reload();
    }, false);
    document.getElementById("data_button").addEventListener("click", function() {
            popitup("slideshow.html");
    }, false);
    document.getElementById("flask").addEventListener("click", function() {
            flask();
    }, false);
    document.getElementById("pipette").addEventListener("click", function() {
            pipette();
    }, false);
    document.getElementById("beaker").addEventListener("click", function() {
            beaker();
    }, false);
    document.getElementById("cuvette").addEventListener("click", function() {
            cuvette(this);
    }, false);
    document.getElementById("comp_trans_button").addEventListener("click", function() {
            scan();
    }, false);
    document.getElementById("spectrolid_trans_button").addEventListener("click", function() {
            spectrophotometer();
    }, false);
    document.getElementById("power_trans_button").addEventListener("click", function() {
            changeImage(); showClock();
    }, false);
    document.getElementById("scan_btn").addEventListener("click", function() {
            scanGraph();
    }, false);
    document.getElementById("slider").addEventListener("click", function() {
            setSolution();
    }, false);
    document.getElementById("disposegraph").addEventListener("click", function() {
            disposeGraph();
    }, false);
}

//This function is used to add mouse events to elements.
function mouseEvents(){
    document.getElementById("manual_button").addEventListener("mouseover", function(){
        this.src='images/hover_manual.png';
    });
    document.getElementById("manual_button").addEventListener("mouseout", function(){
        this.src='images/manual_button.png';
    });
    document.getElementById("data_button").addEventListener("mouseover", function(){
        this.src='images/hover_data.png';
    });
    document.getElementById("data_button").addEventListener("mouseout", function(){
        this.src='images/data_button.png';
    });
}

//This function is used to show the choosen value of the slider on the div.
function setSolution(){
    conc_value = document.getElementById('slider').value;
    document.getElementById('scale_value').innerHTML =conc_value + "mM";
}

// Call turnOn() method every 250ms
function changeImage() { 
    setInterval("turnOn()", 250);
}

/*When the user switches on the spectrophotometer this method is called. Here the spectrophotometer image is 
changed continuously to give the blinking light effect. The two images that are swapped is stored in images[]*/
function turnOn() {
    /* Make the power button hidden, once the button is clicked to ensure that the spectrofluorimeter runs 
    only for one click. */
    document.getElementById('power_trans_button').style.visibility = 'hidden';
    // Get the image
    turnon = document.getElementById('table_with_spec');
    // Change the source of the image 
    turnon.src = images[x];
    //increment x;
    x++;
    if(x >= images.length){
        x = 0;
    }
}

/*This method displays a timer which runs for 30 seconds. There exists two images which are hidden initailly; 
when this method is called they are amde visible and the clock hand is made to rotate.*/  
function showClock(){
    if(step_no==0){
        // Get the images.
        var context=document.getElementById('clockScreen');
        var hand =document.getElementById('clockHand');
        // Make the visiblility of the obtained images visible
        context.style.visibility='visible';
        hand.style.visibility="visible";
        // Rotate 'clockHand' using jQueryRotate.js
        var angle = 0;
        setInterval(function(){
            angle+=3;
            $('#clockHand').rotate(angle);
        },50);
        step_no++;
        //After 3 secs dispose clock
        setTimeout("removeClock()",3000);
    }
}

// After 30 seconds of display of the timer the visibility of clock is changed back to hidden.
function removeClock() {
    $('#clockHand, #clockScreen').remove();
  //Change to next intsruction to be followed.
  document.getElementById("demo").innerHTML = "चरण संख्या 2: पोटेशियम डाइक्रोमेट के तीन उचित सांद्रता (जैसे 0.001M, 0.00075M, 0.001M) बनाएं [समाधान की उपयुक्तता का चयन करने के लिए एकाग्रता बार पर क्लिक करें और खींचें जिसका माप होना है, उसके साथ शुरू करना बेहतर है कम सांद्रता समाधान] साफ सूखे बीकर लेने के लिए बीकर पर क्लिक करें।";
    cursorPointers('power_trans_button', 'beaker');
}
    
// This function is called when spectrometer lid is clicked.
// First time its called to open the spectrophotometer
// Second time its called to close the spectrophotometer
function spectrophotometer(){
    if (step_no == 8 && count == 9){
        // Replace the spectrophotometer images with the open spectrophotometer images
        images[0] = "images/spec_open.png";
        images[1] = "images/spec_open.png";
      document.getElementById("demo").innerHTML = "चरण संख्या 9: नमूना धारक में रखने के लिए क्युवेट पर क्लिक करें। इस माप में पानी का उपयोग नमूना बैंक या संदर्भ के रूप में किया जाता है। यहां एक डबल बीम स्पेक्ट्रोफोटोमीटर दिखाया गया है। इस मामले में एक नमूना धारक (अक्सर सामने वाला) और नमूना बैंक या संदर्भ धारक (अक्सर वापस एक) में एक साथ नमूना रख सकते हैं।";
        step_no++;
        cursorPointers('spectrolid_trans_button', 'cuvette');
    }
    else if(step_no == 10 && count == 13){
        // Replace the spectrophotometer images with the closed spectrophotmeter images.
        images[0] = "images/spec_close.png";
        images[1] = "images/spec_close1.png";
      document.getElementById("demo").innerHTML = "चरण संख्या 10: कंप्यूटर मॉनिटर और फिर स्कैन बटन पर क्लिक करके तरंग दैर्ध्य स्कैन चलाएं और तरंग दैर्ध्य स्कैन का निरीक्षण करें";
        step_no++;
        cursorPointers('spectrolid_trans_button', 'comp_trans_button');
    }
}

//This method is called to display the graph image based on cuvette chosen by clicking on computer screen.
function scan() {
    if(step_no==11){
        if(conc_value==0.02){
            document.getElementById('scanimage1').style.visibility = 'visible';
        }
        else if(conc_value==0.04){
            document.getElementById('scanimage2').style.visibility = 'visible';
        }
        else if(conc_value==0.06){
            document.getElementById('scanimage3').style.visibility = 'visible';
        }
        else if(conc_value==0.08){
            document.getElementById('scanimage4').style.visibility = 'visible';
        }
        else if(conc_value==0.10){
            document.getElementById('scanimage5').style.visibility = 'visible';
        }
        // Get the scan image background.                                                               }
        document.getElementById('scan').style.visibility = 'visible';
        cursorPointers('comp_trans_button','scan_btn');
        step_no++;
    }
}

// This method is used to play a video which shows constructing graphs based on their sample path length. 
function scanGraph(){
    if(step_no==12){
        /*After the cuvette are inserted into the spectrophotometer, when the computer in pressed to scan, 
        depending on the solution choosen appropriate graph video is obtained.*/
        if(conc_value==0.02){
            var vid = document.getElementById("graph1");
        }
        else if(conc_value==0.04){
            var vid = document.getElementById("graph2");
        }
        else if(conc_value==0.06){
            var vid = document.getElementById("graph3");
        }
        else if(conc_value==0.08){
            var vid = document.getElementById("graph4");
        }
        else if(conc_value==0.10){
            var vid = document.getElementById("graph5");
        }
        $(".scanimage").css('visibility', 'hidden');
        // make the video obtained visible.
        vid.style.visibility='visible';
        //play the video.
        vid.play(); 
        cursorPointers('scan_btn', 'disposegraph');
        step_no++;
    }
}

//This method makes the graph hidden once the video is played and close is pressed. 
function disposeGraph(){
    if(step_no==13){
        /*After playing the graph plotting video close option is choosen, the background scan image and the 
        video is made hidden.*/
        $('#scan, .video').css('visibility', 'hidden');
      document.getElementById('demo').innerHTML= 'नया माप शुरू करने के लिए रीसेट बटन पर क्लिक करें। अगले उच्च एकाग्रता और इतने पर माप को फिर से खोलें।';
    }
}
