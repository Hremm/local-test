<template>
  <div>
    <div class="tags">
      <!-- 左箭头 -->
      <div
        class="arrow arrow_left"
        v-show="arrowVisible"
        @click="handleClickToLeft"
      >
        <i class="el-icon-arrow-left"></i>
      </div>
      <!-- 标签内容 -->
      <div class="tags_content" ref="box">
        <span ref="tags">
          <el-tag
            v-for="(tag, index) in tags"
            :key="tag.name"
            :class="[active == index ? 'active top_tags' : 'top_tags']"
            effect="dark"
            :closable="tag.name != 'index'"
            @close="handleClose(index, tag)"
            @click="clickTag(index, tag)"
            @contextmenu.native.prevent="handleClickContextMenu(index, tag)"
          >
            首页
          </el-tag>
        </span>
      </div>
      <!-- 右箭头 -->
      <div
        class="arrow arrow_right"
        v-show="arrowVisible"
        @click="handleClickToRight"
      >
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <!-- 右键菜单 -->
    <ul
      v-show="contextMenu.isShow"
      :style="{ left: contextMenu.menuLeft, top: '96px' }"
      class="el-dropdown-menu el-popper"
      x-placement="bottom-end"
    >
      <li
        v-if="this.active == this.contextMenu.index"
        class="el-dropdown-menu__item"
        @click="refresh"
      >
        刷新
      </li>
      <li class="el-dropdown-menu__item" @click="closeRightTag">
        关闭右侧
      </li>
      <li class="el-dropdown-menu__item" @click="closeOtherTag">
        关闭其它
      </li>
      <div x-arrow="" class="popper__arrow" style="left: 44px;"></div>
    </ul>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
export default {
  data() {
    return {
      // 是否有箭头
      arrowVisible: true,
      // 点击次数
      num: 0,
      active: 0,
      tags: [],
      // 右键的元素
      contextMenu: {
        index: 0,
        tag: {},
        menuLeft: 0,
        isShow: false
      }
    };
  },
  watch: {
    $route() {
      this.getThisPage();
    },
    tags() {
      this.listenFun(this.$refs.tags, "tags");
    }
  },
  mounted() {
    this.listenFun(this.$refs.box, "box");
    var that = this;
    document.addEventListener("click", function(e) {
      that.contextMenu.isShow = false;
    });
  },
  methods: {
    // 监听可视区域宽,浏览器窗口大小改变执行
    listenFun(monitor, dom) {
      let boxWidth = this.$refs.box.offsetWidth,
        tagsWidth = this.$refs.tags.offsetWidth,
        erd = elementResizeDetectorMaker();
      erd.listenTo(monitor, ele => {
        this.$nextTick(() => {
          if (
            (dom == "box" && ele.offsetWidth >= tagsWidth) ||
            (dom == "tags" && ele.offsetWidth <= boxWidth)
          ) {
            this.arrowVisible = false;
            this.$refs.box.style.paddingLeft = "16px";
            this.$refs.box.style.paddingRight = "16px";
            this.$refs.box.style.transform = "TranslateX(0px)";
            this.num = 0;
          } else {
            this.arrowVisible = true;
            this.$refs.box.style.paddingLeft = "56px";
            this.$refs.box.style.paddingRight = "56px";
          }
        });
      });
    },
    // 判断当前页
    getThisPage() {
      let currentPgae = this.$route;
      // 判断tags里是否有当前页面
      var index = this.tags.findIndex(tag => tag.name == currentPgae.name);
      if (index == -1) {
        this.tags.push({
          name: currentPgae.name,
          path: currentPgae.path
        });
      }
      // 当前选择页
      this.active = this.tags.findIndex(tag => tag.name == currentPgae.name);
    },
    // 关闭标签
    handleClose(index, tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
      if (index == this.tags.length) {
        this.active = index - 1;
        this.$router.push(this.tags[index - 1].path);
      } else {
        this.$router.push(this.tags[index].path);
      }
    },
    // 点击标签
    clickTag(index, tag) {
      this.active = index;
      this.$router.push(tag.path);
    },
    // 左侧按钮
    handleClickToLeft() {
      if (this.num > 0) {
        this.num--;
        this.$refs.box.style.transform = `TranslateX(-${this.num * 200}px)`;
      }
    },
    // 右侧按钮
    handleClickToRight() {
      // 最后一个标签右测距离浏览器左侧距离
      let lastChild = document
        .querySelectorAll(".top_tags")
        [this.tags.length - 1].getBoundingClientRect().right;
      // 可视窗口的宽
      let bodyWidth = document.body.offsetWidth;
      // 右侧箭头48+右侧边距16
      if (bodyWidth - lastChild <= 64) {
        this.num++;
        this.$refs.box.style.transform = `TranslateX(-${this.num * 200}px)`;
      }
    },
    // 右键
    handleClickContextMenu(index, tag) {
      this.contextMenu.isShow = true;
      this.contextMenu.index = index;
      this.contextMenu.tag = tag;
      let isTag = document
        .querySelectorAll(".top_tags")
        [index].getBoundingClientRect();
      this.contextMenu.menuLeft = isTag.left - 48 + isTag.width / 2 + "px";
    },
    // 刷新
    refresh() {
      this.$router.go(0);
    },
    // 关闭其他
    closeOtherTag() {
      let tagsLin = this.tags.length,
        { index, tag, menuLeft } = this.contextMenu;
      if (index != 0) {
        this.tags = [
          {
            name: tag.name,
            path: tag.path
          }
        ];
      } else {
        this.tags = [
          {
            
            name: "首页",
            path: "index"
          }
        ];
      }
      this.active = index;
      this.$router.push(tag.path);
    },
    // 关闭右侧
    closeRightTag() {
      let tagsLin = this.tags.length,
        { index, tag, menuLeft } = this.contextMenu;
      this.tags.splice(index + 1, tagsLin - index);
      this.active = index;
      this.$router.push(tag.path);
    }
  },
  created() {
    // 监听页面刷新
    window.addEventListener("beforeunload", e => {
      localStorage.setItem(
        "tagInfo",
        JSON.stringify({
          active: this.active,
          tags: this.tags
        })
      );
    });
    let tagInfo = localStorage.getItem("tagInfo")
      ? JSON.parse(localStorage.getItem("tagInfo"))
      : {
          active: 0,
          tags: [
            {
              name: "index",
              path: "index"
            }
          ]
        };
    this.active = tagInfo.active;
    this.tags = tagInfo.tags;
  }
};
</script>
<style lang="less" scoped>
/deep/.el-tag--dark {
  border-color: transparent;
}
/deep/.el-tag--dark .el-tag__close {
  color: #86909c;
  font-size: 16px;
}
/deep/.el-tag--dark .el-tag__close:hover {
  background: #e7eaf0;
}
.tags {
  position: relative;
  overflow: hidden;
  .arrow {
    width: 48px;
    text-align: center;
    cursor: pointer;
    background: #fff;
    position: absolute;
    z-index: 1;
    &_left {
      left: 0;
      top: 0;
    }
    &_right {
      right: 0;
      top: 0;
    }
  }
  &_content {
    transition: 0.3s;
    white-space: nowrap;
    // padding: 0 16px;
  }
  .top_tags {
    margin-right: 8px;
    cursor: pointer;
    background: #fff;
    font-size: 12px;
    font-weight: 400;
    color: #1d2129;
  }
  .top_tags:hover,
  .active,
  .arrow:hover {
    background: #e7eaf0;
  }
}
</style>

