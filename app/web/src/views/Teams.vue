<template>

  <div class="Teams-container min-h-screen p-4 md:p-6 lg:p-8"
    :style="{ background: 'var(--color-background-default)' }">
    <!-- 每个分组 -->
    <div v-for="group in dataList" :key="group.teamName" class="mb-8 last:mb-0">
      <!-- 分组标题 + 操作按钮 -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold" :style="{ color: 'var(--card-text)' }">
          {{ group.teamName }}
        </h2>
        <div class="flex items-center gap-1">
          <el-dropdown placement="bottom-end">
            <button class="p-1.5 rounded hover:bg-(--menu-hover-bg) transition-colors"
              :style="{ color: 'var(--card-text-secondary)' }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>新增团队</el-dropdown-item>
                <el-dropdown-item>新增工作空间</el-dropdown-item>

              </el-dropdown-menu>
            </template>
          </el-dropdown>


          <!-- <button class="p-1.5 rounded hover:bg-(--menu-hover-bg) transition-colors"
            :style="{ color: 'var(--card-text-secondary)' }" title="编辑">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button> -->
          <button class="p-1.5 rounded hover:bg-(--menu-hover-bg) transition-colors"
            :style="{ color: 'var(--card-text-secondary)' }" title="删除">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
          <button class="p-1.5 rounded hover:bg-(--menu-hover-bg) transition-colors"
            :style="{ color: 'var(--card-text-secondary)' }" title="成员管理">
            <ShowIcon name="memberIcon" fill="#64748b"></ShowIcon>
          </button>

        </div>
      </div>

      <!-- 知识库卡片网格（响应式） -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="space in group.workSpace" :key="space.name"
          @click="goDocs(space)"
          class="p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer" :style="{
            background: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
          }">
          <!-- 卡片头部：图标 + 名称 + 锁图标 -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <!-- 文件夹图标 -->
              <svg class="w-5 h-5" :style="{ color: 'var(--icon-primary)' }" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
              </svg>
              <span class="font-medium" :style="{ color: 'var(--card-text)' }">
                {{ space.name }}
              </span>
            </div>
            <!-- 锁图标 -->
            <svg class="w-4 h-4" :style="{ color: 'var(--card-text-secondary)' }" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <!-- 卡片内容：文档列表/空状态 -->
          <div class="min-h-15">
            <div v-if="space.descript" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span :style="{ color: 'var(--card-text-secondary)' }">
                  {{ space.descript }}
                </span>
              </div>
            </div>
            <div v-else class="flex items-center  h-full text-sm" :style="{ color: 'var(--empty-text)' }">
              知识库暂无内容
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { workSpaceStore } from "~/stores/modules/workSpaceStore";
import { teamsStroe } from "~/stores/modules/teams";
import { useRouter } from "vue-router";
const router = useRouter()
const useworkSpaceStore = workSpaceStore()
const useTeamsStroe = teamsStroe()


interface WorkSpaceItem {
  id: number
  name: string
  descript?: string
  sort: number
  teamId: number
}
interface TeamItem {
  id: number
  team: {
    name: string,
    description: string
  }
  role: string,
  userId: number
  teamId: number
}

interface GroupItem {
  teamId: string
  teamName: string
  workSpace: WorkSpaceItem[]
}

type teamsDataType = Record<string, TeamItem>
type spaceDataType = Record<string, WorkSpaceItem[]>
function mergeData(teamData: teamsDataType, spaceData: spaceDataType) {
  let res: any = [];
  for (const key in teamData) {
    if (!Object.hasOwn(teamData, key)) continue;
    const teamItem = teamData[key];
    const teamId = teamItem.teamId
    let dataItem: any = {
      teamName: teamItem.team.name,
      teamId,
      workSpace:spaceData[teamId]
    };
    res.push(dataItem)

  }
  return res;
}
let dataList :any = mergeData(useTeamsStroe.data,useworkSpaceStore.dataList)

function goDocs(space:WorkSpaceItem){
  router.push({
    path:`workSpace/item/${space.id}`
  })
}

// 示例数据（和截图一致，可直接替换）
// let dataList: GroupItem[] = [
//   {
//     teamName: "我的知识库",
//     workSpace: [
//       {
//         name: "默认知识库",
//         descript: "",
//       },

//       },
//     ]
//   },
//   {
//     teamName: "大智的工作空间",
//     workSpace: [
//       {
//         name: "销售",
//         descript: "销售知识库",

//       },
//       {
//         name: "开发",
//         descript: "",

//       },
//     ]
//   }
// ]
</script>

<style lang="scss" scoped>
.Teams-container {
  width: 100%;
  min-height: 100vh;
}
</style>