import Team from '../database/models/Team';

export default class Teams {
  constructor(private _model = Team) { }

  public async getAll() {
    const teamsExists = await this._model.findAll();

    if (!teamsExists) {
      return { status: 404, message: 'Teams not found', isError: true };
    }

    return { status: 200, teamsExists, isError: false };
  }

  public async getById(id: number) {
    const teamExist = await this._model.findByPk(id);

    if (!teamExist) {
      return { status: 404, message: 'Team not found', isError: true };
    }

    return { status: 200, teamExist, isError: false };
  }
}
