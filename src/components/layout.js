import React from "react";
import { css, Global } from "@emotion/core";
import { Link } from "gatsby";
import { FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

// const ListLink = props => (
//   <li style={{ display: "inline-block", marginRight: "1rem" }}>
//     <Link to={props.to} style={{ color: "rebeccapurple", textDecoration: "none" }}>{props.children}</Link>
//   </li>
// );

const ListLink = props => (
  <li css={css`display: inline-block; margin-right: 1rem;`}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const ExternalListLink = props => (
  <li css={css` display: inline-block; margin-right: 1rem;` }>
    <a href={props.to}>{props.children}</a>
  </li>
);

export default ({ children, data }) => (
  <div css={css`margin: 3rem auto; max-width: 800px; padding: 0 1rem;`}>
    <Global styles={css`
      a {
        color: rebeccapurple;
        text-decoration: none;
      }
      a:hover {
        color: cadetblue;
      }
    `}
    />
    <header css={css`margin-bottom: 1.5rem;`}>
      <Link to="/" css={css`text-shadow: none; background-image: none;`}>
        <h2 css={css`display: inline;`}>Out of Focus</h2>
      </Link>
      <ul css={css`list-style: none; float: right;`}>
        <ListLink to="/"><h4>Home</h4></ListLink>
        <ListLink to="/about/"><h4>About</h4></ListLink>
        <ListLink to="/episodes/"><h4>Episodes</h4></ListLink>
        <ExternalListLink to="https://twitter.com/outoffocusshow"><h4><FaTwitter /></h4></ExternalListLink>
        <ExternalListLink to="https://www.instagram.com/outoffocusshow/"><h4><FaInstagram /></h4></ExternalListLink>
        <ExternalListLink to="https://discord.gg/aDupnY2"><h4><FaDiscord /></h4></ExternalListLink>
      </ul>
    </header>
    {children}
  </div>
);
