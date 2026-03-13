import { Component, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonType {
  type: { name: string };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: { 'official-artwork': { front_default: string } };
  };
  types: PokemonType[];
  stats: PokemonStat[];
  height: number;
  weight: number;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private http = inject(HttpClient);

  pokemon = signal<Pokemon | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  lastNumber = signal<number | null>(null);

  mainStat = computed(() => {
    const p = this.pokemon();
    if (!p) return [];
    const wanted = ['hp', 'attack', 'defense', 'speed'];
    return p.stats
      .filter((s) => wanted.includes(s.stat.name))
      .map((s) => ({
        name: s.stat.name.toUpperCase(),
        value: s.base_stat,
        percent: Math.min(100, Math.round((s.base_stat / 255) * 100)),
      }));
  });

  artworkUrl = computed(() => {
    const p = this.pokemon();
    if (!p) return '';
    return (
      p.sprites.other?.['official-artwork']?.front_default ||
      p.sprites.front_default
    );
  });

  generateRandom() {
    const num = Math.floor(Math.random() * 1025) + 1;
    this.lastNumber.set(num);
    this.loading.set(true);
    this.error.set(null);
    this.pokemon.set(null);

    this.http
      .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${num}`)
      .pipe(
        finalize(() => this.loading.set(false)),
        catchError(() => {
          this.error.set('Failed to fetch Pokémon. Please try again.');
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) this.pokemon.set(data);
      });
  }

  typeColor(type: string): string {
    const colors: Record<string, string> = {
      fire: '#FF6B35',
      water: '#4FC3F7',
      grass: '#66BB6A',
      electric: '#FFEE58',
      psychic: '#EC407A',
      ice: '#80DEEA',
      dragon: '#7E57C2',
      dark: '#546E7A',
      fairy: '#F48FB1',
      fighting: '#EF5350',
      flying: '#90CAF9',
      poison: '#AB47BC',
      ground: '#BCAAA4',
      rock: '#8D6E63',
      bug: '#9CCC65',
      ghost: '#5C6BC0',
      steel: '#90A4AE',
      normal: '#BDBDBD',
    };
    return colors[type] || '#BDBDBD';
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
  }
}
