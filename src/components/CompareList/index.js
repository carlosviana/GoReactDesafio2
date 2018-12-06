import React, { Component } from "react";

import PropTypes from "prop-types";
import { Container, Repository } from "./styles";

export default class CompareList extends Component {
  render() {
    const { repositories, removeItem, updateItem } = this.props;

    return (
      <Container>
        {repositories.map(repository => (
          <Repository key={repository.id}>
            <header>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <strong>{repository.owner.name}</strong>
              <small>{repository.owner.login}</small>
            </header>

            <ul>
              <li>
                {repository.stargazers_count} <small>stars</small>
              </li>
              <li>
                {repository.forks_count} <small>forks</small>
              </li>
              <li>
                {repository.open_issues_count} <small>issues</small>
              </li>
              <li>
                {repository.last_commit} <small>last commit</small>
              </li>
            </ul>
            <button
              className="remove"
              onClick={removeItem.bind(this, repository)}
            >
              Remove repositório
            </button>
            <button
              className="update"
              onClick={updateItem.bind(this, repository)}
            >
              Atualiza dados
            </button>
          </Repository>
        ))}
      </Container>
    );
  }
}

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string
    })
  ).isRequired
};
