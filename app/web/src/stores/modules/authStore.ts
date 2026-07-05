import { defineStore } from "pinia";
import { login, register, generateCode } from "~/api/auth";
import type { LoginDto, RegisterDto, AuthResponse } from "~/api/auth";
import { ElMessage } from 'element-plus';

export const authStore = defineStore("authStore", {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: {
      email: '',
      username: '',
      avatar: ''
    },
    isLoading: false,
    error: null as string | null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.token,
    userInfo: (state) => ({
      email: state.user.email,
      username: state.user.username,
      avatar: state.user.avatar
    }),
    getToken: (state) => state.token
  },
  
  actions: {
    // 用户登录
    async userLogin(data: LoginDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await login(data);
        
        if (res.code === "200" || res.code === 200) {
          // 登录成功，保存token和用户信息
          this.token = res.data.token;
          this.user = {
            email: res.data.email,
            username: res.data.username,
            avatar: res.data.avatar || ''
          };
          
          // 保存token到localStorage
          localStorage.setItem('token', this.token);
          
          ElMessage({
            type: "success",
            message: "登录成功"
          });
          
          return res;
        } else {
          this.error = res.message || "登录失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('用户登录失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "登录失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        this.error = errorMessage;
        ElMessage.error(errorMessage);
        
        // 不重新抛出错误，让组件能够继续执行
        return {
          code: "ERROR",
          message: errorMessage,
          data: null
        };
      } finally {
        this.isLoading = false;
      }
    },
    
    // 用户注册
    async userRegister(data: RegisterDto) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await register(data);
        
        if (res.code === "200" || res.code === 200) {
          // 注册成功，保存token和用户信息
          this.token = res.data.token;
          this.user = {
            email: res.data.email,
            username: res.data.username,
            avatar: res.data.avatar || ''
          };
          
          // 保存token到localStorage
          localStorage.setItem('token', this.token);
          
          ElMessage({
            type: "success",
            message: "注册成功"
          });
          
          return res;
        } else {
          this.error = res.message || "注册失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('用户注册失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "注册失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        this.error = errorMessage;
        ElMessage.error(errorMessage);
        
        // 不重新抛出错误，让组件能够继续执行
        return {
          code: "ERROR",
          message: errorMessage,
          data: null
        };
      } finally {
        this.isLoading = false;
      }
    },
    
    // 生成验证码
    async generateVerifyCode(email: string) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await generateCode(email);
        
        if (res.code === "200" || res.code === 200) {
          ElMessage({
            type: "success",
            message: "验证码已发送到您的邮箱"
          });
          
          return res;
        } else {
          this.error = res.message || "验证码发送失败";
          ElMessage.error(this.error);
          throw new Error(this.error);
        }
      } catch (error: any) {
        console.error('生成验证码失败:', error);
        
        // 显示用户友好的错误消息
        let errorMessage = "验证码发送失败，请重试";
        if (error.message) {
          errorMessage = error.message;
        } else if (error.code === "NETWORK_ERROR") {
          errorMessage = "网络连接失败，请检查网络";
        }
        
        this.error = errorMessage;
        ElMessage.error(errorMessage);
        
        // 不重新抛出错误，让组件能够继续执行
        return {
          code: "ERROR",
          message: errorMessage,
          data: null
        };
      } finally {
        this.isLoading = false;
      }
    },
    
    // 用户登出
    async userLogout() {
      try {
        // 清除本地存储
        this.token = '';
        this.user = {
          email: '',
          username: '',
          avatar: ''
        };
        
        localStorage.removeItem('token');
        
        ElMessage({
          type: "success",
          message: "已退出登录"
        });
      } catch (error) {
        console.error('用户登出失败:', error);
        ElMessage.error("退出登录失败");
      }
    },
    
    // 清除认证信息
    clearAuth() {
      this.token = '';
      this.user = {
        email: '',
        username: '',
        avatar: ''
      };
      this.error = null;
      localStorage.removeItem('token');
    },
    
    // 初始化用户信息（从localStorage）
    initAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.token = token;
        // 这里可以添加从token解析用户信息的逻辑
      }
    }
  }
});