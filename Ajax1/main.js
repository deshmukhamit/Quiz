/**
 * Created by aksonawa on 4/8/2014.
 */
var curQues = -1;
var score=0;
var response;
var btnCount=0;
var value=0;
var flag=1;
function sendRequest(direction)
{
    console.log("Ready");
    var XHR=createXHR();
    var response;
    if(XHR)
    {
        console.log("Ready Again");
        XHR.open("GET","mess.json",true);
        console.log(XHR.readyState);
        XHR.onreadystatechange=function()
        {
            handleresponse(XHR,direction);
        }
        XHR.send(null);
    }
}

function createXHR()
{
    console.log("In XHR");
    return new XMLHttpRequest();
}

function handleresponse(XHR,direction)
{
    if(XHR.readyState==4 && XHR.status)
    {
        response=JSON.parse(XHR.responseText);
        console.log(response.test[0].ques);
        console.log(response.test[0].option[0]);
        console.log(response.test[0].correctAnswer);
        if(curQues==4)
        {
            alert("You have successfully completed Test..Thank you");
            document.body.innerHTML="Your score is "+score;
            return;
        }

        if (direction == 'next')
        {
            curQues++;
        }
        else
        {
            if(curQues==0)
                curQues=response.test.length;
            curQues--;
        }

        if(curQues>0)
         {
            var rightAnswer = response.test[curQues - 1].correctAnswer;
            var chosenAnswer = document.getElementById("choice" + (rightAnswer + 1));
            console.log("choice" + (rightAnswer + 1));
            if (chosenAnswer.checked)
            {
                 score++;
            }
         }
        console.log(response.test[curQues].ques);
        console.log(response.test.length);
        addHTML(response);
        if(flag==1)
        {
            for (var i = 0; i < response.test.length; i++)
                addButton();
                flag++;
        }
    }
}

function nextQues(direction)
{
    var response=sendRequest(direction);
    var start=document.getElementById("start");
    start.disabled=true;

    var ops11=document.getElementById("choice1");
    var ops22=document.getElementById("choice2");
    var ops33=document.getElementById("choice3");
    var ops44=document.getElementById("choice4");
    ops11.style.visibility='visible';
    ops22.style.visibility='visible';
    ops33.style.visibility='visible';
    ops44.style.visibility='visible';

}


function addButton() {
    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", ""+btnCount);
    element.setAttribute("name", "button"+btnCount);
    element.setAttribute("onclick", "showQuestion("+btnCount+")");

    document.getElementById("quesButton").appendChild(element);
    btnCount++;
}

function showQuestion(btnCount)
{
    value=10;
    addHTML(response,btnCount,value);
}

function addHTML(response,btnCount,value)
{
    if(value==10)
    {
        curQues=btnCount;
    }
    var question=document.getElementById("ques");
    var ops1=document.getElementById("ops1");
    var ops2=document.getElementById("ops2");
    var ops3=document.getElementById("ops3");
    var ops4=document.getElementById("ops4");

    console.log(response.test[curQues].ques);
    question.innerHTML =response.test[curQues].ques;
    ops1.innerHTML=response.test[curQues].option[0];
    ops2.innerHTML=response.test[curQues].option[1];
    ops3.innerHTML=response.test[curQues].option[2];
    ops4.innerHTML=response.test[curQues].option[3];
}