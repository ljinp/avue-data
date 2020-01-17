<template>
  <div class="build">
    <div class="content"
         ref="content">
      <div class="container"
           :style="styleName">
        <avue-draggable disabled
                        :index="index"
                        :z-index="item.zIndex"
                        v-for="(item,index) in list"
                        :width="item.component.width"
                        :height="item.component.height"
                        :key="index"
                        :top="item.top"
                        :left="item.left"
                        v-show="!item.destruction && !item.display">
          <avue-echart-slide v-if="item.component.prop==='slide'"
                             :option="item.component.option"
                             :width="item.width"
                             :height="item.height">
            <div class="swiper-slide"
                 v-for="(citem,cindex) in item.child.index"
                 :key="cindex">
              <component :width="item.component.width"
                         :height="item.component.height"
                         :ref="'list_'+index"
                         disabled
                         :id="'component_'+index"
                         :is="'avue-echart-'+list[citem].component.name"
                         :component="list[citem].component"
                         :data="list[citem].data"
                         :option="list[citem].component.option"
                         :theme="list[citem].component.option.theme"
                         :url="list[citem].url"
                         :child="list[citem].child"
                         :time="list[citem].time"
                         :home-url="config.url"
                         :data-method="list[citem].dataMethod"
                         :data-type="list[citem].dataType"
                         :data-query="handleGetQuery(list[citem])"
                         :data-append="list[citem].dataAppend"
                         :click="handleConClick"
                         :formatter="list[citem].formatter"
                         :label-formatter="list[citem].labelFormatter"
                         :click-formatter="list[citem].clickFormatter"
                         :data-formatter="list[citem].dataFormatter"
                         :title-formatter="list[citem].titleFormatter">
              </component>
            </div>
          </avue-echart-slide>

          <component v-else
                     :width="item.component.width"
                     :height="item.component.height"
                     :ref="'list_'+index"
                     :id="'component_'+index"
                     :is="'avue-echart-'+item.component.name"
                     :component="item.component"
                     :data="item.data"
                     :option="item.component.option"
                     :theme="item.component.theme"
                     :url="item.url"
                     :child="item.child"
                     :time="item.time"
                     :home-url="config.url"
                     :data-method="item.dataMethod"
                     :data-type="item.dataType"
                     :data-query="handleGetQuery(item)"
                     :data-append="item.dataAppend"
                     :click="handleConClick"
                     :formatter="item.formatter"
                     :label-formatter="item.labelFormatter"
                     :click-formatter="item.clickFormatter"
                     :data-formatter="item.dataFormatter"
                     :title-formatter="item.titleFormatter">
          </component>

        </avue-draggable>

      </div>
    </div>
  </div>
</template>
<script>
import init from '@/mixins/'
export default {
  mixins: [init],
}
</script>
<style lang="scss">
@import "../styles/style.scss";
</style>