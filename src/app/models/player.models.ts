export interface Player {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: number,
  birth: string;
  nationality: string;
  height: any,
  weight: any,
  photo: string,
  league: {
    name: string;
    country: string;
    logo: string;
    season: number;
  }
  game: {
    appearences: number,
    lineups: number,
    minutes: number,
    number: number,
    position: string,
    rating: string,
    captain: boolean
  },
  substitute: {
    in: any,
    out: any,
    bench: any
  },
  shot: {
    total: any,
    on: any
  },
  goal: {
    total: any,
    conceded: any,
    assists: any,
    saves: any
  },
  passe: {
    total: any,
    key: any,
    accuracy: any
  },
  tackle: {
    total: any,
    blocks: any,
    interceptions: any
  },
  duel: {
    total: any,
    won: any
  },
  dribble: {
    attempts: any,
    success: any,
    past: any
  },
  foul: {
    drawn: any,
    committed: any
  },
  card: {
    yellow: any,
    yellowred: any,
    red: any
  },
  penalty: {
    won: any,
    committed: any,
    scored: any,
    missed: any,
    saved: any
  }
}