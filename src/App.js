import React, { Component} from "react";
import "./index.css";
import { green } from "ansi-colors";

const EFFECTIVENESS = [ // Attack then defense
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, .5, 0, 1, 1, .5, 1],
    [1, 1, .5, .5, 1, 2, 2, 1, 1, 1, 1, 1, 2, .5, 1, .5, 1, 2, 1],
    [1, 1, 2, .5, 1, .5, 1, 1, 1, 2, 1, 1, 1, 2, 1, .5, 1, 1, 1],
    [1, 1, 1, 2, .5, .5, 1, 1, 1, 0, 2, 1, 1, 1, 1, .5, 1, 1, 1],
    [1, 1, .5, 2, 1, .5, 1, 1, .5, 2, .5, 1, .5, 2, 1, .5, 1, .5, 1],
    [1, 1, .5, .5, 1, 2, .5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, .5, 1],
    [1, 2, 1, 1, 1, 1, 2, 1, .5, 1, .5, .5, .5, 2, 0, 1, 2, 2, .5],
    [1, 1, 1, 1, 1, 2, 1, 1, .5, .5, 1, 1, 1, .5, .5, 1, 1, 0, 2],
    [1, 1, 2, 1, 2, .5, 1, 1, 2, 1, 0, 1, .5, 2, 1, 1, 1, 2, 1],
    [1, 1, 1, 1, .5, 2, 1, 2, 1, 1, 1, 1, 2, .5, 1, 1, 1, .5, 1],
    [1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, .5, 1, 1, 1, 1, 0, .5, 1],
    [1, 1, .5, 1, 1, 2, 1, .5, .5, 1, .5, 2, 1, 1, .5, 1, 2, .5, .5],
    [1, 1, 2, 1, 1, 1, 2, .5, 1, .5, 2, 1, 2, 1, 1, 1, 1, .5, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, .5, 1, 1], 
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, .5, 0],
    [1, 1, 1, 1, 1, 1, 1, .5, 1, 1, 1, 2, 1, 1, 2, 1, .5, 1, .5],
    [1, 1, .5, .5, .5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, .5, 2],
    [1, 1, .5, 1, 1, 1, 1, 1, .5, 1, 1, 1, 1, 1, 1, 2, 2, .5, 1]
];

const [NONE, NORMAL, FIRE, WATER, ELECTRIC, GRASS, ICE, FIGHTING, POISON, GROUND,
    FLYING, PSYCHIC, BUG, ROCK, GHOST, DRAGON, DARK, STEEL, FAIRY] = [...Array(19).keys()];

const TYPES = ['--', 'NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND',
'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY'];

const RELEVANT_ABILITIES = ['--', 'LEVITATE', 'DRY SKIN', 'WATER ABSORB', 'STORM DRAIN', 'FLASH FIRE', 'LIGHTNINGROD', 'MOTOR DRIVE', 'VOLT ABSORB', 'SAP SIPPER', 'WONDER GUARD'];

const typeSelector = (id) => (
    <div>
        <select name={'PokemonA'+id} id={'PokemonA'+id}>
            {TYPES.map((type) =>
            <option value={type} key={type}>
                {type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()}
            </option>)}
        </select>
        &nbsp;
        <select name={'PokemonB'+id} id={'PokemonB'+id}>
            {TYPES.map((type) =>
            <option value={type} key={type}>
                {type.charAt(0).toUpperCase() + type.substring(1).toLowerCase()}
            </option>)}
        </select>
    </div>)

const abilitySelector = (id) => (
    <select name={'PokemonAbility'+id} id={'PokemonAbility'+id}>
        {RELEVANT_ABILITIES.map((ability) =>
        <option value={ability} key={ability}>
            {ability.charAt(0).toUpperCase() + ability.substring(1).toLowerCase()}
        </option>)}
    </select>
);

function analyze () {
    const party = $("form").serializeArray();
    const partyDefenses = [];
    for(let i = 0; i < party.length; i += 4){
        const [{value: name}, {value: type1}, {value: type2}, {value: ability}] = party.slice(i, i+4);
        if(type1 != '--' || type2 != '--'){
            const pokemonDefenses = [];
            const t1 = type1 == '--' ? NONE : eval(type1);
            const t2 = type2 == '--' ? NONE : eval(type2);

            for(let j = 0; j < EFFECTIVENESS.length; j++){
                pokemonDefenses.push(EFFECTIVENESS[j][t1] * EFFECTIVENESS[j][t2])
            }
            switch(ability){
                case '--': break;
                case 'LEVITATE': pokemonDefenses[GROUND] = 0; break;
                case 'DRY SKIN': pokemonDefenses[WATER] = 0; break;
                case 'WATER ABSORB': pokemonDefenses[WATER] = 0; break;
                case 'STORM DRAIN': pokemonDefenses[WATER] = 0; break;
                case 'FLASH FIRE': pokemonDefenses[FIRE] = 0; break;
                case 'LIGHTNINGROD': pokemonDefenses[ELECTRIC] = 0; break;
                case 'MOTOR DRIVE': pokemonDefenses[ELECTRIC] = 0; break;
                case 'VOLT ABSORB': pokemonDefenses[ELECTRIC] = 0; break;
                case 'SAP SIPPER': pokemonDefenses[GRASS] = 0; break;
                case 'WONDER GUARD': pokemonDefenses.forEach((val, i, arr) => arr[i] = (arr[i] >= 2 ? arr[i] : 0))
            }
            partyDefenses.push(pokemonDefenses);
        }
    }
    return partyDefenses;
}

const styleBox = (column, value) => {
    const style = {};
    // [WEAKNESSES, DOUBLE_WEAKNESS, RESISTS, DOUBLE_RESISTS, IMMUNE, NEUTRAL]
    switch(column){
        case 'DOUBLE_WEAKNESS':
            style.backgroundColor = value > 3 ? '#990000' : value > 2 ? '#CC0000' : value > 1 ? '#FF3333' : value > 0 ? '#ff6666' : undefined;
            break;
        case 'WEAKNESSES':
            style.backgroundColor = value > 3 ? '#CC0000' : value > 2 ? '#FF3333' : value > 1 ? '#FF6666' : value > 0 ? '#ff9999' : undefined;
            break;
        case 'RESISTS':
                style.backgroundColor = value > 3 ? '#00CC00' : value > 2 ? '#33FF33' : value > 1 ? '#66FF66' : value > 0 ? '#99ff99' : undefined;
                break;
        case 'DOUBLE_RESISTS':
                style.backgroundColor = value > 3 ? '#009900' : value > 2 ? '#00CC00' : value > 1 ? '#33FF33' : value > 0 ? '#66FF66' : undefined;
                break;
        case 'IMMUNE':
            style.backgroundColor = value > 3 ? '#0066CC' : value > 2 ? '#0080FF' : value > 1 ? '#3399FF' : value > 0 ? '#66B2FF' : undefined;
            break;
    }
    return style;
}

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            partyMembers: [1, 2, 3, 4, 5, 6],
            maxNum: 6,
            results: []
        }
    };

    render(){
        return (
            <div className="App">
                <form name="party" id="party">
                    {this.state.partyMembers.map((idNum) => <div key={'Pokemon'+idNum}>
                        <h3>Pokemon {idNum}</h3>
                        <input type="text" placeholder='Nickname' name={'PokemonName'+idNum} id={'PokemonName'+idNum}></input>
                        {typeSelector(idNum)}
                        {abilitySelector(idNum)}
                    </div>)}
                </form>
                <br/>
                <button onClick={() => {
                    this.setState({
                        partyMembers: this.state.partyMembers.concat([this.state.maxNum + 1]),
                        maxNum: this.state.maxNum + 1
                    })}}>
                    Add another Pokemon
                </button>
                <br/>
                <button onClick={() => this.setState({results: analyze()})}>
                    Analyze
                </button>
                {this.state.results.length ?
                    <div id="results">
                        <table>
                            <thead>
                                <tr>
                                    <th>Attack Type</th>
                                    {this.state.partyMembers.map((pokemon) => {
                                        if($('#PokemonA' + pokemon).children("option:selected").val() != "--" ||
                                        $('#PokemonB' + pokemon).children("option:selected").val() != "--"){
                                            return <th key={"Result"+pokemon}>{$('#PokemonName' + pokemon).val()}</th>
                                        }
                                        else return null;
                                    })}
                                    <th className="resultsTallySpacer"></th>
                                    <th>2x Weaknesses</th>
                                    <th>Weaknesses</th>
                                    <th>Neutral</th>
                                    <th>Resistances</th>
                                    <th>2x Resistances</th>
                                    <th>Immunities</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TYPES.map((type, typeIndex) => {
                                    let [WEAKNESSES, DOUBLE_WEAKNESS, RESISTS, DOUBLE_RESISTS, IMMUNE, NEUTRAL] = Array(6).fill(0);
                                    return type=='--' ? null:
                                     <tr key={type+'row'}>
                                        <td>{type}</td>
                                        {this.state.results.map((pokemon) =>{
                                            switch(pokemon[typeIndex]){
                                                case 0: IMMUNE++; break;
                                                case .25: DOUBLE_RESISTS++; break;
                                                case .5: RESISTS++; break;
                                                case 1: NEUTRAL++; break;
                                                case 2: WEAKNESSES++; break;
                                                case 4: DOUBLE_WEAKNESS++; break;
                                            }
                                            return <td key={type+pokemon}>{'' + pokemon[typeIndex]}</td>
                                        })}
                                        <td className="resultsTallySpacer"></td>
                                        <td style={styleBox('DOUBLE_WEAKNESS', DOUBLE_WEAKNESS)}>{DOUBLE_WEAKNESS}</td>
                                        <td style={styleBox('WEAKNESSES', WEAKNESSES)}>{WEAKNESSES}</td>
                                        <td>{NEUTRAL}</td>
                                        <td style={styleBox('RESISTS', RESISTS)}>{RESISTS}</td>
                                        <td style={styleBox('DOUBLE_RESISTS', DOUBLE_RESISTS)}>{DOUBLE_RESISTS}</td>
                                        <td style={styleBox('IMMUNE', IMMUNE)}>{IMMUNE}</td>
                                    </tr>}
                                )}
                            </tbody>
                        </table>
                    </div> : null
                }
            </div>
        );
    }
}

export default App;