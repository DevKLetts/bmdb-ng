import { Actor } from "./actor";
import { Movie } from "./movie";

export class Credit {
  creditid: number;
  actor: Actor;
  movie: Movie;
  role: string = "";

  constructor(
    creditid: number = 0,
    actor: Actor = new Actor(),
    movie: Movie = new Movie(),
    role: string = ''
  ) {
    this.creditid = creditid;
    this.actor = actor;
    this.movie = movie;
    this.role = role;
  }

}


