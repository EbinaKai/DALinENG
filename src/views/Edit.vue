<template>
  <main>
    <div class="wrapper">
      <form>
        <div class="form-group">
          <input class="form-control" type="text" name id="title" placeholder="Title" v-model="content.title">
        </div>
        <div class="form-group">
          <textarea class="form-control py-3" name="text" id="text" rows="40" spellcheck="false" placeholder="contents..." v-model="text"></textarea>
        </div>
        <div class="edit-btn-box mb-5">
          <button @click="back" class="btn-cancel btn btn-lg btn-secondary rounded-pill px-5 py-3 d-inline-block">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
            &nbsp;CANCEL
          </button>
          <button @click="trash" class="btn-save btn btn-lg btn-danger rounded-pill px-5 py-3 d-inline-block" type="submit">
            <font-awesome-icon icon="fa-solid fa-trash" />
            &nbsp;DELETE
          </button>
          <button @click="save" class="btn-save btn btn-lg btn-primary rounded-pill px-5 py-3 d-inline-block" type="submit">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" />
            &nbsp;SAVE
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
  import e from "cors";
import io from "socket.io-client";
  export default {
    name: "Edit",
    props: ['id'],
    data: () => ({
      text: "",
      content: {
        title: "",
        text: "",
        id: -1,
        vol: 0,
      },
      socket: io("http://192.168.68.82:3001"),
    }),
    created() {
      if ( this.id == -1 ) {
        // 新規データを作成
        this.content.vol = this.$route.query.vol;
      } else {
        // 既存データを編集
        this.socket.emit("GET_DATA_BY_ID", this.id, (response) => {
          Object.keys(this.content).forEach((key) => {
            this.content[key] = response.DATA_BY_ID[key];
          });
          this.text = this.content.text;
          setTimeout(this.fadeIn);
        });
      }

      // c-s shortcut
      window.addEventListener("keyup", e => {
        if( e.ctrlKey && e.key === "s" ) {
            console.log(e.key)
            this.save(undefined, false);
        }
      })
    },
    methods: {
      // 保存
      save(e=undefined, flag=true) {
        if ( e !== undefined )  e.preventDefault();
        this.content.text = $("#text")[0].value;

        // 編集データを送信
        if( this.id == -1 ) {
          this.socket.emit("CREATE_DATA", this.content, (response) => {
            if ( response.status && flag)  this.back();
          });
        } else {
          this.socket.emit("SET_DATA", this.content, (response) => {
            if ( response.status && flag)  this.back();
          });
        }
      },

      // 削除
      trash(e) {
        e.preventDefault();

        if ( !confirm("really delete this article?") ) return;

        // 削除するIDを送信
        this.socket.emit("DELETE_DATA_BY_ID", this.content.id, (response) => {
          if ( response.status ) {
            window.location.href = "/DALeng/encore/" + this.content.vol;
          }
        });

      },

      // 前ページに戻る
      back(e = undefined) {
        if ( e !== undefined ) {
          e.preventDefault();
        }
        if ( this.id == -1 ) {
          console.log("/DALeng/encore/" + this.content.vol)
          window.location.href = "/DALeng/encore/" + this.content.vol;
          return;
        }
        window.location.href = "/DALeng/section/" + this.content.id;
      },  
    },

    // 文字変換
    watch: {
      text(Val, oldVal) {
        this.text = Val.replace("--", "—");
        this.content.text = this.text;
      }
    }
  };
</script>

<style>
  #title {
    font-size: 40px;
  }

  textarea.form-control {
    resize: none;
    height: 75vh;
  }

  .form-group label {
    font-size: 24px;
  }

  .btn-save {
    margin-left: 30px;
  }
  @media screen and (max-width: 1040px) {
    textarea.form-control {
      height: 65vh;
    }

    .edit-btn-box {
      display: flex;
      flex-direction: column-reverse;
    }

    .edit-btn-box button {
      display: block;
      width: 100%;
    }

    .btn-save {
      margin-left: 0;
      margin-bottom: 30px;
    }
  }
</style>