const API_ENDPOINT = "https://tkdt.hidro.dev/scan_sensor";

export function getListSensor() {
  fetch(`API_ENDPOINT${'scan_sensor'}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// export async function getapi() {
    
//     // Storing response
//     const response = await fetch(API_ENDPOINT);
    
//     // Storing data in form of JSON
//     var data = await response.json();
//     // console.log(data);
//     // if (response) {
//     //     hideloader();
//     // }
//     // show(data);
//     return data;
// }