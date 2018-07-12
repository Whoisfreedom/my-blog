<template>
  <div class="calendar">
    <div class="ca_title">
    	<span>当前时间 {{year}}年 {{month}}月 {{date}}日 星期{{weekDay}}</span>
    </div>
    <div class="clock">
      <div class="ca_container">
        <div v-for="(item,index) in monthDayList" :style="{transform: item.rotate}" :key="index" class="time_num">
          <i></i>
        </div>
        <div :style="{transform: hourDeg}" class="hour_line time_line">
          <i></i>
        </div>
        <div :style="{transform: minutesDeg}" class="minutes_line time_line">
          <i></i>
        </div>
        <div :style="{transform: secondDeg}" class="second_line time_line">
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: '',
      month: '',
      date: '',
      weekDay: '',
      hour: '',
      hourDeg: 'rotateZ(90deg)',
      minutes: '',
      minutesDeg: 'rotateZ(90deg)',
      second: '',
      secondDeg: 'rotateZ(90deg)',
      monthDayList: [{
        rotate: 'rotateZ(0deg)'
      }, {
        rotate: 'rotateZ(30deg)'
      }, {
        rotate: 'rotateZ(60deg)'
      }, {
        rotate: 'rotateZ(90deg)'
      }, {
        rotate: 'rotateZ(120deg)'
      }, {
        rotate: 'rotateZ(150deg)'
      }, {
        rotate: 'rotateZ(180deg)'
      }, {
        rotate: 'rotateZ(210deg)'
      }, {
        rotate: 'rotateZ(240deg)'
      }, {
        rotate: 'rotateZ(270deg)'
      }, {
        rotate: 'rotateZ(300deg)'
      }, {
        rotate: 'rotateZ(330deg)'
      }]
    }
  },
  created() {
    this.getYear()
  },
  methods: {
    getYear() {
      let nowDate = new Date()
      this.year = nowDate.getFullYear()
      this.month = nowDate.getMonth()
      this.date = nowDate.getDate()
      this.weekDay = nowDate.getDay()
      // 设置时针并运动
      setInterval(() => {
        let nowDate = new Date()
        this.hour = nowDate.getHours()
        this.minutes = nowDate.getMinutes()
        this.second = nowDate.getSeconds()
        this.setClock(this.hour, this.minutes, this.second)
      }, 1000)
    },
    setClock(hour, minutes, second) {
      // 秒针一秒6deg
      let secondDeg = second * 6 + 90
      // 分针一格6deg,1秒
      let minutesDeg = minutes * 6 + second / 10 + 90
      // 时针
      let hourDeg = hour % 12 * 30 + minutes * 0.5 + 90
      this.secondDeg = 'rotateZ(' + secondDeg + 'deg)'
      this.minutesDeg = 'rotateZ(' + minutesDeg + 'deg)'
      this.hourDeg = 'rotateZ(' + hourDeg + 'deg)'
    }
  }
}
</script>
<style>
.calendar
{
 height: 100%;
 width: 100%;
}
.ca_title
{
 height: 50px;
 width: 100%;
 text-align: center;
 line-height: 50px;
 font-family: "Source Sans Pro", Arial, sans-serif;
}
.clock
{
 height: calc(100% - 50px);
 width: 100%;
 padding-top: 5px;
}
.ca_container{
 height: 220px;
 width: 220px;
 margin: 0 auto;
 position: relative;
}
.time_num
{
 width: 200px;
 height: 5px;
 text-align: left;
 position: absolute;
 top: 107.5px;
 left: 10px;
 transform-origin: 50% 0;
}
.time_line
{
 height: 5px;
 text-align: left;
 position: absolute;
 top: 107.5px;
}
.hour_line.time_line
{
 left: 60px;
 width: 100px;
 transform-origin: 50px 2.5px;
}
.minutes_line.time_line
{
 left: 50px;
 width: 120px;
 transform-origin: 60px 2.5px;
}
.second_line.time_line
{
 left: 40px;
 width: 140px;
 transform-origin: 70px 2.5px;
}
.time_num i
{
 display: block;
 position: absolute;
 left: 0;
 top: 0;
 width: 10px;
 height: 5px;
 background-color: #000;
}
.time_line i
{
 display: block;
 position: absolute;
 left: 0;
 top: 0;
 width: 60%;
 height: 5px;
 background-color: #000;
}
</style>
