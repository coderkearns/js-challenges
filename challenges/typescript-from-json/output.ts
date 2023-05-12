type Types = Array<string>

type Evolution = Array<{
    num: string,
    name: string
}>

type Pokemon = Array<{
    id: number,
    num: string,
    name: string,
    img: string,
    type: Types,
    height: string,
    weight: string,
    candy: string,
    candy_count: number,
    egg: string,
    spawn_chance: number,
    avg_spawns: number,
    spawn_time: string,
    multipliers: Array<number>,
    weaknesses: Types,
    next_evolution: Evolution
}>

type JSONRoot = {
    pokemon: Pokemon
}
