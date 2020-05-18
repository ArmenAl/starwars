import { Component, OnInit } from '@angular/core';
import { GetCharactersService } from '../get-characters.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  characterInfo: string;
  show: boolean[] = [];
  showIndex: number;
  people = [];
  filteredPeoples = [];

  constructor(private httpCharacters: HttpClient) { }

  ngOnInit() {
    this.getPeople("https://swapi.dev/api/people/");
  }

  getPeople(url) {
    this.httpCharacters.get(url)
      .subscribe((data) => {
        data["results"].forEach((element) => {

          this.people.push(element);
        });

        if (data["next"] != null) {
          this.getPeople(data["next"]);
        } else {
          this.assignCopy();
        }
      });
  }

  showInfo(showIndex) {
    console.log(this.show);
    if (this.show[showIndex] === true) {
      this.show[showIndex] = false;
    } else {
      this.show[showIndex] = true;
    }
  }

  assignCopy() {
    this.filteredPeoples = Object.assign([], this.people);
  }

  filterPeople(value) {
    console.log(value);
    if (!value) {
      this.assignCopy();
    } // when nothing has typed
    this.filteredPeoples = Object.assign([], this.people).filter(
      item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    )
  }

}
