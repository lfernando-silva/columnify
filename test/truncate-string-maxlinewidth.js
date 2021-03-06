var test = require('tape')
var fs = require('fs')

var columnify =  require('../')

var data = [{
  name: 'alongnameshouldbesplitovermultiplelines',
  description: 'some description',
  version: '0.0.1'
}, {
  name: 'module-two',
  description: 'another description larger than the max',
  version: '0.2.0',
}, {
  name: 'module-three',
  description: 'thisisaverylongwordandshouldbetruncated',
  version: '0.2.0',
}, {
  name: '这是一个很长的名字的模块',
  description: '这真的是一个描述的内容这个描述很长',
  version: "0.3.3"
}]

test('specific columns can be truncated, while others not', function(t) {
  var expected = fs.readFileSync(__dirname + '/truncate-string-maxlinewidth-expected.txt', 'utf8')

  t.equal(columnify(data, {
    maxLineWidth: 34,
    config: {
      name: {
        truncate: false,
        maxWidth: 9,
        truncateMarker: ''
      },
      description: {
        truncate: true,
        maxWidth: 20
      }
    }
  }).trim(), expected.trim())
  t.end()
})

test('when no maxLineWidth, nothing is changed', function(t) {
  t.equal(columnify(data, {
    config: {
      name: {
        truncate: false,
        maxWidth: 9,
        truncateMarker: ''
      },
      description: {
        truncate: true,
        maxWidth: 20
      }
    }
  }).trim(), fs.readFileSync(__dirname + '/truncate-column-expected.txt', 'utf8').trim())

  t.end()
})

test('maxLineWidth: "auto" with column max widths', function(t) {
  t.equal(columnify(data, {
    maxLineWidth: 'auto',
    config: {
      name: {
        truncate: false,
        maxWidth: 9,
        truncateMarker: ''
      },
      description: {
        truncate: true,
        maxWidth: 20
      }
    }
  }).trim(), fs.readFileSync(__dirname + '/truncate-column-expected.txt', 'utf8').trim())
  t.end()
})
