export const MODEL_TREE_MINES_OPTIONS = [
    {
        value: 'COVIDMINE',
        label: 'CovidMine'
    },
    {
        value: 'FLYMINE',
        label: 'FlyMine'
    },
    {
        value: 'HUMANMINE',
        label: 'HumanMine'
    },
    {
        value: 'TARGETMINE',
        label: 'TargetMine'
    },
    {
        value: 'YEASTMINE',
        label: 'YeastMine'
    },
]

export const modelEndpoints = {
    FLYMINE: 'https://www.flymine.org/flymine/service/model?format=json',
    HUMANMINE: 'https://www.humanmine.org/humanmine/service/model?format=json',
    TARGETMINE: 'https://targetmine.mizuguchilab.org/targetmine/service/model?format=json',
    YEASTMINE: 'https://yeastmine.yeastgenome.org/yeastmine/service/model?format=json',
    COVIDMINE: 'https://test.intermine.org/covidmine//service/model?format=json'
}