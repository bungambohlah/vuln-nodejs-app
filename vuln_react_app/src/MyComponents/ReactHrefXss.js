import React, { useEffect, useState } from "react";
// uncomment this for patching
// import ReactDOMServer from "react-dom/server";
// import sanitizeHtml from "sanitize-html";
// import parse from "html-react-parser";

export default function React_href_xss() {
  const [state, setState] = useState({ name: "", email: "", website: "" });
  // uncomment this for patching
  // const [sanitizedLink, setSanitizedLink] = useState(
  //   `<a href={${state.website}>${state.website}</a>`
  // );

  function updateForm() {
    document.getElementById("updated").setAttribute("hidden", true);
    document.getElementById("update").removeAttribute("hidden");
  }

  async function saveData() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const website = document.getElementById("website").value;
    const request = await fetch(`${window.location.origin}/react-xss`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: name, email: email, website: website }),
    });
    const response = await request.json();
    // console.log(response);
    setState({
      name: response.name,
      email: response.email,
      website: response.website,
    });
    document.getElementById("update").setAttribute("hidden", true);
    document.getElementById("updated").removeAttribute("hidden");
  }

  // uncomment this for patching
  // useEffect(() => {
  //   if (state.website)
  //     setSanitizedLink(
  //       sanitizeHtml(`<a href=${state.website}>${state.website}</a>`)
  //     );
  // }, [state.website]);

  return (
    <div>
      <br />
      <div className="container">
        <h2>React XSS</h2>
        <br />
        <p>
          Application is using ReactJS which provides by default protection from
          XSS attacks by encoding dangerous characters before appending it to
          the page but there are cases when it will not protect you from XSS
          attacks. In this exercise you will learn how you can perform XSS when
          application passes user supplied input to <b>href</b> attribute.
        </p>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Update Profile</h5>
            <div id="update">
              <p className="card-text">
                Name: <input type="text" id="name"></input>
                <br />
                <br />
                Email: <input type="email" id="email"></input>
                <br />
                <br />
                Website:{" "}
                <input
                  type="website"
                  id="website"
                  placeholder="https://example.com"
                ></input>{" "}
                <br />
                <br />
                <button onClick={saveData}>Save</button>
              </p>
            </div>
            <div id="updated" hidden>
              <p className="card-text">
                Name: {state.name} <br />
                Email: {state.email} <br />
                {/* uncomment this for patching */}
                {/* Website: {parse(sanitizedLink)} */}
                Website: <a href={state.website}>{state.website}</a>
                <br />
                <br />
                <button onClick={updateForm}>Edit</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
