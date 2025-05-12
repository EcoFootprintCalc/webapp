const parseUnit = (unit) => {
    return <span dangerouslySetInnerHTML={{__html: unit.replace(/(\w)\^(\w)/g, "$1<sup>$2</sup>")}} />
}

export default parseUnit