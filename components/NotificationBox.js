import React from 'react'

export default function NotificationBox() {
    (
        function notify(){
            console.log("notify")
            var element = document.getElementById("myDIV");
            element.classList.add("notification-animation");
            setTimeout(()=>{
              element.classList.remove("notification-animation");
            },4000)
          }
    )
  return (
    <div class="notification-box" id="myDIV">
    <div class="not-box">
      Your data has been saved! and now can continue working
    </div>
  </div>
  )
}
