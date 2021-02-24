var markPointData = [
    {
    "name": "北碚",
    "coord": [
      106.587868,
      29.92543
    ]
  },
  {
    "name": "渝北",
    "coord": [
      106.812851,
      29.951451
    ]
  },
  {
    "name": "璧山",
    "coord": [
      106.101126,
      29.543581
    ]
  },
  {
    "name": "永川",
    "coord": [
      105.854714,
      29.298748
    ]
  },
  {
    "name": "沙坪坝",
    "coord": [
      106.3542,
      29.741224
    ]
  },
  {
    "name": "渝中",
    "coord": [
      106.50288,
      29.656742
    ]
  },
  {
    "name": "江北",
    "coord": [
      106.732844,
      29.705352
    ]
  },
  {
    "name": "南岸",
    "coord": [
      106.660813,
      29.603992
    ]
  },
  {
    "name": "九龙坡",
    "coord": [
      106.300989,
      29.563492
    ]
  },
  {
    "name": "大渡口",
    "coord": [
      106.39613,
      29.421002
    ]
  },
  {
    "name": "巴南",
    "coord": [
      106.829423,
      29.381919
    ]
  },
  {
    "name": "江津",
    "coord": [
      106.253156,
      29.183387
    ]
  },{
  "name": "荣昌",
  "coord": [
    105.404061,
    29.503627
  ]
},
  {
    "name": "梁平",
    "coord": [
      107.550034,
      30.772168
    ]
  },
  {
    "name": "城口",
    "coord": [
      108.6649,
      31.946293
    ]
  },
  {
    "name": "巫溪",
    "coord": [
      109.428912,
      31.4966
    ]
  },
  {
    "name": "开州",
    "coord": [
      108.388696,
      31.362529
    ]
  },
  {
    "name": "云阳",
    "coord": [
      108.697698,
      31.090529
    ]
  },
  {
    "name": "奉节",
    "coord": [
      109.465774,
      31.019967
    ]
  },
  {
    "name": "巫山",
    "coord": [
      109.978928,
      31.274843
    ]
  },
  {
    "name": "万州",
    "coord": [
      108.380246,
      30.807807
    ]
  },
  {
    "name": "忠县",
    "coord": [
      107.937518,
      30.391537
    ]
  },
  {
    "name": "垫江",
    "coord": [
      107.448692,
      30.330012
    ]
  },
  {
    "name": "石柱",
    "coord": [
      108.312448,
      30.19853
    ]
  },
  {
    "name": "丰都",
    "coord": [
      107.83248,
      29.966424
    ]
  },
  {
    "name": "长寿",
    "coord": [
      107.174854,
      30.033671
    ]
  },
  {
    "name": "涪陵",
    "coord": [
      107.294905,
      29.753652
    ]
  },
  {
    "name": "武隆",
    "coord": [
      107.75655,
      29.52376
    ]
  },
  {
    "name": "彭水",
    "coord": [
      108.366551,
      29.493856
    ]
  },
  {
    "name": "黔江",
    "coord": [
      108.782577,
      29.527548
    ]
  },
  {
    "name": "酉阳",
    "coord": [
      108.767201,
      28.939828
    ]
  },
  {
    "name": "秀山",
    "coord": [
      108.996043,
      28.544772
    ]
  },
  {
    "name": "潼南",
    "coord": [
      105.841818,
      30.289554
    ]
  },
  {
    "name": "合川",
    "coord": [
      106.265554,
      30.190993
    ]
  },
  {
    "name": "大足",
    "coord": [
      105.715319,
      29.700498
    ]
  },
  {
    "name": "铜梁",
    "coord": [
      106.054948,
      29.929944
    ]
  },
  {
    "name": "綦江",
    "coord": [
      106.651417,
      28.928091
    ]
  },
  {
    "name": "南川",
    "coord": [
      107.098153,
      29.156646
    ]
  },
];

//区县城市
var cityArray = [
  {name: '奉节', value: 0, dayValue: 0, mpId: 3965},
  {name: '巫溪', value: 0, dayValue: 0, mpId: 3976},
  {name: '开州', value: 0, dayValue: 0, mpId: 3975},
  {name: '酉阳', value: 0, dayValue: 0, mpId: 3995},
  {name: '彭水', value: 0, dayValue: 0, mpId: 3986},
  {name: '云阳', value: 0, dayValue: 0, mpId: 3573},
  {name: '万州', value: 0, dayValue: 0, mpId: 3974},
  {name: '城口', value: 0, dayValue: 0, mpId: 3979},
  {name: '江津', value: 0, dayValue: 0, mpId: 3985},
  {name: '石柱', value: 0, dayValue: 0, mpId: 3997},
  {name: '巫山', value: 0, dayValue: 0, mpId: 3977},
  {name: '涪陵', value: 0, dayValue: 0, mpId: 3947},
  {name: '丰都', value: 0, dayValue: 0, mpId: 3487},
  {name: '武隆', value: 0, dayValue: 0, mpId: 3996},
  {name: '南川', value: 0, dayValue: 0, mpId: 3937},
  {name: '秀山', value: 0, dayValue: 0, mpId: 3990},
  {name: '黔江', value: 0, dayValue: 0, mpId: 3957},
  {name: '合川', value: 0, dayValue: 0, mpId: 3983},
  {name: '綦江', value: 0, dayValue: 0, mpId: 3994},
  {name: '忠县', value: 0, dayValue: 0, mpId: 3932},
  {name: '梁平', value: 0, dayValue: 0, mpId: 3933},
  {name: '巴南', value: 0, dayValue: 0, mpId: 4019},
  {name: '潼南', value: 0, dayValue: 0, mpId: 3934},
  {name: '永川', value: 0, dayValue: 0, mpId: 4021},
  {name: '垫江', value: 0, dayValue: 0, mpId: 3585},
  {name: '渝北', value: 0, dayValue: 0, mpId: 3971},
  {name: '长寿', value: 0, dayValue: 0, mpId: 3978},
  {name: '大足', value: 0, dayValue: 0, mpId: 4020},
  {name: '铜梁', value: 0, dayValue: 0, mpId: 3961},
  {name: '荣昌', value: 0, dayValue: 0, mpId: 3954},
  {name: '璧山', value: 0, dayValue: 0, mpId: 3980},
  {name: '北碚', value: 0, dayValue: 0, mpId: 3989},
  {name: '万盛', value: 0, dayValue: 0, mpId: 3940},
  {name: '九龙坡', value: 0, dayValue: 0, mpId: 4022},
  {name: '沙坪坝', value: 0, dayValue: 0, mpId: 3970},
  {name: '南岸', value: 0, dayValue: 0, mpId: 3973},
  {name: '江北', value: 0, dayValue: 0, mpId: 3960},
  {name: '大渡口', value: 0, dayValue: 0, mpId: 3939},
  {name: '渝中', value: 0, dayValue: 0, mpId: 3993},
];
var mapIdsArray = [
  { mpId: 4060},
  { mpId: 3985 },
  { mpId: 3957 },
  { mpId: 3972 },
  { mpId: 3978 },
  { mpId: 3961 },
  { mpId: 3995 },
  { mpId: 3952 },
  { mpId: 3984 },
  { mpId: 3503 },
  { mpId: 3574 },
  { mpId: 3954 },
  { mpId: 4023 },
  { mpId: 3935 },
  { mpId: 3994 },
  { mpId: 3999 },
  { mpId: 3982 },
  { mpId: 3997 },
  { mpId: 3946 },
  { mpId: 4078 },
  { mpId: 3931 },
  { mpId: 3951 },
  { mpId: 3980 },
  { mpId: 3934 },
  { mpId: 3971 },
  { mpId: 3993 },
  { mpId: 3947 },
  { mpId: 3970 },
  { mpId: 3960 },
  { mpId: 4021 },
  { mpId: 3950 },
  { mpId: 3535 },
  { mpId: 3597 },
  { mpId: 3996 },
  { mpId: 3933 },
  { mpId: 4069 },
  { mpId: 3998 },
  { mpId: 3936 },
  { mpId: 3981 },
  { mpId: 3486 },
  { mpId: 3948 },
  { mpId: 3932 },
  { mpId: 3975 },
  { mpId: 3955 },
  { mpId: 3582 },
  { mpId: 4019 },
  { mpId: 3976 },
  { mpId: 3977 },
  { mpId: 3964 },
  { mpId: 3965 },
  { mpId: 4020 },
  { mpId: 3939 },
  { mpId: 3988 },
  { mpId: 3538 },
  { mpId: 3979 },
  { mpId: 3585 },
  { mpId: 3963 },
  { mpId: 3962 },
  { mpId: 3991 },
  { mpId: 3983 },
  { mpId: 3968 },
  { mpId: 3953 },
  { mpId: 3969 },
  { mpId: 3992 },
  { mpId: 3937 },
  { mpId: 3973 },
  { mpId: 3579 },
  { mpId: 3989 },
  { mpId: 4026 },
  { mpId: 3956 },
  { mpId: 3583 },
  { mpId: 3536 },
  { mpId: 3958 },
  { mpId: 3949 },
  { mpId: 3987 },
  { mpId: 4000 },
  { mpId: 3966 },
  { mpId: 3573 },
  { mpId: 4022 },
  { mpId: 3487 },
  { mpId: 3581 },
  { mpId: 3940 },
  { mpId: 3974 },
  { mpId: 3572 },
  { mpId: 3990 },
  { mpId: 3986 }
];
//产生三位数随机数
function randomData() {
  return Math.round(Math.random()*1000);
}