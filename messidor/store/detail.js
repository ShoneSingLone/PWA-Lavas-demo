// import axios from 'axios';

// const SET_NEWS_LIST = 'setNewsList';

// export const state = () => ({
//     list: [{
//         assignee: null,
//         assignees: [],
//         author_association: "MEMBER",
//         body: "",
//         closed_at: null,
//         comments: 0,
//         comments_url: "https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues/25/comments",
//         created_at: "2018-07-01T15:06:46Z",
//         events_url: "https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues/25/events",
//         html_url: "https://github.com/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues/25",
//         id: 337298044,
//         labels: [],
//         labels_url: "https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues/25/labels{/name}",
//         locked: false,
//         milestone: null,
//         node_id: "MDU6SXNzdWUzMzcyOTgwNDQ=",
//         number: 25,
//         repository_url: "https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly",
//         state: "open",
//         title: "技术周刊 第 19 期",
//         updated_at: "2018-07-01T15:06:46Z",
//         url: "https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues/25",
//     }]
// });

// export const mutations = {
//     [SET_NEWS_LIST](state, newsArray) {
//         state.list = newsArray;
//     }
// };

// export const actions = {
//     async SET_LIST({
//         commit
//     }, params) {
//         try {
//             let url = `https://api.github.com/repos/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues`;
//             let result = await axios(url);
//             let list = result.data;
//             commit(SET_NEWS_LIST, list)
//         } catch (e) {
//             // TODO with error
//             console.log('error in DETAIL/SET_NEWS_LIST');
//             console.log(e);
//         }
//     }
// };

import axios from 'axios';

const SET_WEATHER = 'setWeather';

export const state = () => ({
    weather: {
        text: '',
        temp: 0
    }
});

export const getters = {
    weather: state => {
        return state.weather;
    }
};

export const mutations = {
    [SET_WEATHER](state, {
        weatherText,
        weatherTemp
    }) {
        state.weather = {
            text: weatherText,
            temp: weatherTemp
        };
    }
};

export const actions = {
    async [SET_WEATHER]({
        commit
    }, params) {
        try {
            let url = `https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20%3D%20${params.woeid}&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
            let result = await axios(url);

            let condition = result.data.query.results.channel.item.condition;
            commit(SET_WEATHER, {
                weatherText: condition.text,
                weatherTemp: condition.temp
            })
        } catch (e) {
            // TODO with error
            console.log('error in setWeather');
            console.log(e);
        }
    }
};
