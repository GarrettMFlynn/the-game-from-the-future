
function allQueries(option){
    let all = ['Future-Time','Conflict','Players','Motivation','Location']
    for (const ind in all) {
        queryCSV(all[ind],option)
    }
}

function chooseLanguage(language) {
    if (language == 'Ελληνικά'){
        language = 'Greek'
    }

    let file = '../assets/interface' + language + '.csv'
    d3.csv(file).then(function (data) {
        let headers = Object.keys( data[0] ) // then taking the first row object and getting an array of the keys
        for (const header in headers) {
            document.getElementById(headers[header]+0).innerHTML = data[0][headers[header]];
            for (let row=0; row < data.length; row++) {
                if ((headers[header] != "Name" && headers[header] != "Description")){
                    document.getElementById(headers[header] + (row)).innerHTML = data[row][headers[header]];
                }
            }
        }})
    allQueries(language)
}

function queryCSV(text_id,option) {
    let file_id = ''
    if (option == 'Ελληνικά'){
        option = 'Greek'
    }

    switch(option) {
        case 'Classic':
            switch(text_id){
                case 'Future-Time':
                    file_id = 'tgftf';
                    break;
                case 'Conflict':
                    file_id = 'tgftf';
                    break;
                case 'Players':
                    file_id = 'tgftf';
                    break;
                case 'Motivation':
                    file_id = 'tgftf';
                    break;
                case 'Location':
                    file_id = 'tgftf';
                    break;
            }
            break;
        default:
            file_id = 'tgftf';
    }
    let file = '../assets/' + file_id + option + '.csv'
    d3.csv(file).then(function (data) {
        let flag = true;
        let inner_flag;
        let row;
        let str = text_id.split('-');
        let output;
        let freq;


        if (str.length > 1) {
            for (const col in str) {
                inner_flag = true;
                while (inner_flag) {
                    row = Math.floor(Math.random() * data.length);
                    output = data[row][str[col]];
                    if (output != '') {
                        inner_flag = false;
                        if (str[col] == 'Time' && option == 'English'){
                            output += ' from now'
                        }
                        document.getElementById(str[col]).innerHTML = output;
                    }
                }
            }
        } else {

            // Create bag of words (to account for frequency)
            let bag = [];
            let data_;
            let word;
            let components;
            for (const r in data) {
                data_ = data[r][str[0]]
                if (data_ != undefined && data_ != []) {
                    if (data_.split(' (').length == 2) {
                        components = data_.split(' (')
                        word = components[0];
                        freq = components[1].split(')')[0]
                        for (let i = 0; i < freq; i++) {
                            bag.push(word)
                        }
                    } else{
                        bag.push(data_)
                    }
                }
            }

            while (flag) {
                row = Math.floor(Math.random() * bag.length);
                output = bag[row]
                if (output != '') {
                    flag = false;
                    document.getElementById(text_id).innerHTML = output;
                    if (text_id == 'Players') {
                        switch (option) {
                            case 'Ελληνικά':
                                // switch (output) {
                                //   case 'one': // 'έναν':
                                //     document.getElementById('Players2').innerHTML = 'παίκτης';
                                //     break;
                                //   default:
                                document.getElementById('Players2').innerHTML = 'παίκτες';
                                // break;
                                break
                            case 'English':
                                // switch (output) {
                                //   case 'one':
                                //     document.getElementById('Players2').innerHTML = 'player';
                                //     break;
                                //   default:
                                document.getElementById('Players2').innerHTML = 'players';
                            // break;
                        }
                        break;
                    }
                }
            }
        }
        updatePrompt();
    })
}

function updatePrompt(){
    let all = ['Future','Conflict','Players','Motivation','Location']
    let text = [];
    for (let ind in all){
        if (ind != undefined){
            if (ind != 4){
                if (ind == 0) {
                    text.push(document.getElementById(all[ind] + 1).innerHTML)
                } else{
                    text.push(document.getElementById(all[ind] + 1).innerHTML.toLowerCase())
                }}
            if (ind != 4) {
                text.push('<strong>' + document.getElementById(all[ind]).innerHTML + '</strong>')
            } else{
                text.push('<strong>' + document.getElementById(all[ind]).innerHTML + '</strong>' + '.')
            }

            if (ind != 3) {
                text.push(document.getElementById(all[ind] + 2).innerHTML)
            }

            if (all[ind] == 'Future'){
                text.push('<strong>' + document.getElementById('Time').innerHTML + '</strong>' + ",")
            }
            let prompt = text.join(' ')
            document.getElementById('Prompt').innerHTML = prompt
        }}}
