<template>
  <div>
    <div v-cloak class="mx-auto mt-4 max-w-3xl px-3 container xs:mt-6 md:px-0">
      <div v-if="authenticated === true">
        <div class="flex flex-auto flex-col-reverse items-end items-center gap-3 xxs:flex-row">
          <h1 class="mb-4 flex-grow self-start text-4xl font-medium dark:text-neutral-200">
            <img src="/img/logo.png" width="32" class="dark:bg mr-2 inline align-middle" /><span class="align-middle">WireGuard</span>
          </h1>
          <div class="flex grow-0 items-end items-center self-end gap-3 xxs:self-center">
            <!-- Dark / light theme -->
            <button
              class="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 transition dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
              :title="$t(`theme.${uiTheme}`)"
              @click="toggleTheme"
            >
              <svg
                v-if="uiTheme === 'light'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
              <svg
                v-else-if="uiTheme === 'dark'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-5 w-5 text-neutral-400"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                class="h-5 w-5 fill-gray-600 dark:fill-neutral-400"
              >
                <path
                  d="M12,2.2c-5.4,0-9.8,4.4-9.8,9.8s4.4,9.8,9.8,9.8s9.8-4.4,9.8-9.8S17.4,2.2,12,2.2z M3.8,12c0-4.5,3.7-8.2,8.2-8.2v16.5C7.5,20.2,3.8,16.5,3.8,12z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
                />
              </svg>
            </button>
            <!-- Show / hide charts -->
            <label
              v-if="uiChartType > 0"
              class="group h-8 w-8 inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-gray-200 transition dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
              :title="$t('toggleCharts')"
            >
              <input v-model="uiShowCharts" type="checkbox" value="" class="peer sr-only" @change="toggleCharts" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                fill="currentColor"
                class="peer h-5 w-5 fill-gray-400 transition dark:fill-neutral-600 peer-checked:fill-gray-600 group-hover:dark:fill-neutral-500 peer-checked:dark:fill-neutral-400"
              >
                <path
                  d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z"
                />
              </svg>
            </label>
            <span
              v-if="requiresPassword"
              class="cursor-pointer text-sm text-gray-400 dark:text-neutral-400 hover:underline"
              @click="logout"
            >
              {{ $t("logout") }}
              <svg class="inline h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
          </div>
        </div>
        <div class="mb-5 text-sm text-gray-400 dark:text-neutral-400"></div>
        <div
          v-if="latestRelease"
          class="font-small mb-10 rounded-md bg-red-800 p-4 text-sm text-white shadow-lg dark:bg-red-100 dark:text-red-600"
          :title="`v${currentRelease} → v${latestRelease.version}`"
        >
          <div class="mx-auto flex flex-auto flex-row items-center container">
            <div class="flex-grow">
              <p class="font-bold">{{ $t("updateAvailable") }}</p>
              <p>{{ latestRelease.changelog }}</p>
            </div>

            <a
              href="https://github.com/wg-easy/wg-easy#updating"
              target="_blank"
              class="font-sm float-right flex-shrink-0 border-2 border-red-800 rounded-md bg-white p-3 text-red-800 font-semibold transition-all dark:border-red-600 hover:border-white dark:bg-red-100 hover:bg-red-800 dark:text-red-600 hover:text-white dark:hover:border-red-600 dark:hover:bg-red-600 dark:hover:text-red-100"
            >
              {{ $t("update") }} →
            </a>
          </div>
        </div>

        <div class="overflow-hidden rounded-lg bg-white shadow-md dark:bg-neutral-700">
          <div class="flex flex-auto flex-row items-center border-b-2 border-gray-100 p-3 px-5 dark:border-neutral-600">
            <div class="flex-grow">
              <p class="text-2xl font-medium dark:text-neutral-200">{{ $t("clients") }}</p>
            </div>
            <div class="flex-shrink-0">
              <button
                class="inline-flex items-center border-2 border-gray-100 rounded px-4 py-2 text-gray-700 transition dark:border-neutral-600 hover:border-red-800 hover:bg-red-800 dark:text-neutral-200 hover:text-white"
                @click="
                  clientCreate = true;
                  clientCreateName = '';
                "
              >
                <svg class="mr-2 w-4" inline xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span class="text-sm">{{ $t("new") }}</span>
              </button>
            </div>
          </div>

          <div>
            <!-- Client -->
            <div
              v-for="client in clients"
              v-if="clients && clients.length > 0"
              :key="client.id"
              class="relative overflow-hidden border-b border-gray-100 border-solid last:border-b-0 dark:border-neutral-600"
            >
              <!-- Chart -->
              <div v-if="uiChartType" class="absolute bottom-0 left-0 right-0 z-0 h-6">
                <Apexchart width="100%" height="100%" :options="chartOptionsTX" :series="client.transferTxSeries"> </Apexchart>
              </div>
              <div v-if="uiChartType" class="absolute left-0 right-0 top-0 z-0 h-6">
                <Apexchart
                  width="100%"
                  height="100%"
                  :options="chartOptionsRX"
                  :series="client.transferRxSeries"
                  style="transform: scaleY(-1)"
                >
                </Apexchart>
              </div>

              <div class="relative z-10 flex flex-col justify-between gap-3 px-3 py-3 sm:flex-row md:py-5">
                <div class="w-full flex items-center gap-3 md:gap-4">
                  <!-- Avatar -->
                  <div class="relative mt-2 h-10 w-10 self-start rounded-full bg-gray-50">
                    <svg class="m-2 w-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                    </svg>
                    <img v-if="client.avatar" :src="client.avatar" class="absolute left-0 top-0 w-10 rounded-full" />

                    <div v-if="client.latestHandshakeAt && new Date() - new Date(client.latestHandshakeAt) < 1000 * 60 * 10">
                      <div class="absolute h-4 w-4 animate-ping rounded-full bg-red-100 p-1 -bottom-1 -right-1 dark:bg-red-100"></div>
                      <div class="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-red-800 dark:bg-red-600"></div>
                    </div>
                  </div>

                  <!-- Name & Info -->
                  <div class="xxs:flex-row w-full flex flex-col gap-2">
                    <!-- Name -->
                    <div class="flex flex-grow flex-col gap-1">
                      <div
                        class="group text-sm text-gray-700 md:text-base dark:text-neutral-200"
                        :title="$t('createdOn') + dateTime(new Date(client.createdAt))"
                      >
                        <!-- Show -->
                        <input
                          v-show="clientEditNameId === client.id"
                          :ref="`client-${client.id}-name`"
                          v-model="clientEditName"
                          class="w-30 border-2 border-gray-100 rounded px-1 outline-none dark:border-neutral-600 focus:border-gray-200 dark:bg-neutral-700 dark:focus:border-neutral-500 dark:placeholder:text-neutral-500"
                          @keyup.enter="
                            updateClientName(client, clientEditName);
                            clientEditName = null;
                            clientEditNameId = null;
                          "
                          @keyup.escape="
                            clientEditName = null;
                            clientEditNameId = null;
                          "
                        />
                        <span v-show="clientEditNameId !== client.id" class="border-b-2 border-t-2 border-transparent">{{
                          client.name
                        }}</span>

                        <!-- Edit -->
                        <span
                          v-show="clientEditNameId !== client.id"
                          class="cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
                          @click="
                            clientEditName = client.name;
                            clientEditNameId = client.id;
                            setTimeout(() => $refs[`client-${client.id}-name`][0].select(), 1);
                          "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline h-4 w-4 align-middle opacity-25 hover:opacity-100"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </span>
                      </div>
                      <!-- Address -->
                      <div class="block pb-1 text-xs text-gray-500 md:inline-block md:pb-0 dark:text-neutral-400">
                        <span class="group">
                          <!-- Show -->
                          <input
                            v-show="clientEditAddressId === client.id"
                            :ref="`client-${client.id}-address`"
                            v-model="clientEditAddress"
                            class="w-20 border-2 border-gray-100 rounded text-black outline-none dark:border-neutral-600 focus:border-gray-200 dark:bg-neutral-700 dark:text-neutral-300 dark:focus:border-neutral-500 dark:placeholder:text-neutral-500"
                            @keyup.enter="
                              updateClientAddress(client, clientEditAddress);
                              clientEditAddress = null;
                              clientEditAddressId = null;
                            "
                            @keyup.escape="
                              clientEditAddress = null;
                              clientEditAddressId = null;
                            "
                          />
                          <span v-show="clientEditAddressId !== client.id" class="inline-block">{{ client.address }}</span>

                          <!-- Edit -->
                          <span
                            v-show="clientEditAddressId !== client.id"
                            class="cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
                            @click="
                              clientEditAddress = client.address;
                              clientEditAddressId = client.id;
                              setTimeout(() => $refs[`client-${client.id}-address`][0].select(), 1);
                            "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="inline h-4 w-4 align-middle opacity-25 hover:opacity-100"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </span>
                        </span>
                        <!-- Inline Transfer TX -->
                        <span
                          v-if="!uiTrafficStats && client.transferTx"
                          class="whitespace-nowrap"
                          :title="$t('totalDownload') + bytes(client.transferTx)"
                        >
                          ·
                          <svg class="inline h-3 align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fill-rule="evenodd"
                              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          {{ bytes(client.transferTxCurrent) }}/s
                        </span>

                        <!-- Inline Transfer RX -->
                        <span
                          v-if="!uiTrafficStats && client.transferRx"
                          class="whitespace-nowrap"
                          :title="$t('totalUpload') + bytes(client.transferRx)"
                        >
                          ·
                          <svg class="inline h-3 align-middle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fill-rule="evenodd"
                              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          {{ bytes(client.transferRxCurrent) }}/s
                        </span>
                        <!-- Last seen -->
                        <span
                          v-if="client.latestHandshakeAt"
                          class="whitespace-nowrap text-gray-400 dark:text-neutral-500"
                          :title="$t('lastSeen') + dateTime(new Date(client.latestHandshakeAt))"
                        >
                          {{ !uiTrafficStats ? " · " : "" }}{{ timeago(new Date(client.latestHandshakeAt))  }}
                        </span>
                      </div>
                    </div>

                    <!-- Info -->
                    <div
                      v-if="uiTrafficStats"
                      class="mt-px flex shrink-0 items-center justify-end gap-2 text-xs text-gray-400 dark:text-neutral-400"
                    >
                      <!-- Transfer TX -->
                      <div v-if="client.transferTx" class="min-w-20 md:min-w-24">
                        <span class="flex gap-1" :title="$t('totalDownload') + bytes(client.transferTx)">
                          <svg
                            class="mt-0.5 inline h-3 align-middle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <div>
                            <span class="text-gray-700 dark:text-neutral-200">{{ bytes(client.transferTxCurrent) }}/s</span>
                            <!-- Total TX -->
                            <br /><span class="font-regular" style="font-size: 0.85em">{{ bytes(client.transferTx) }}</span>
                          </div>
                        </span>
                      </div>

                      <!-- Transfer RX -->
                      <div v-if="client.transferRx" class="min-w-20 md:min-w-24">
                        <span class="flex gap-1" :title="$t('totalUpload') + bytes(client.transferRx)">
                          <svg
                            class="mt-0.5 inline h-3 align-middle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <div>
                            <span class="text-gray-700 dark:text-neutral-200">{{ bytes(client.transferRxCurrent) }}/s</span>
                            <!-- Total RX -->
                            <br /><span class="font-regular" style="font-size: 0.85em">{{ bytes(client.transferRx) }}</span>
                          </div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <!-- </div> -->
                  <!-- <div class="flex flex-grow items-center"> -->
                </div>

                <div class="flex items-center justify-end">
                  <div class="flex items-center justify-between gap-1 text-gray-400 dark:text-neutral-400">
                    <!-- Enable/Disable -->
                    <div
                      v-if="client.enabled === true"
                      :title="$t('disableClient')"
                      class="mr-1 inline-block h-6 w-10 cursor-pointer rounded-full bg-red-800 align-middle transition-all hover:bg-red-700"
                      @click="disableClient(client)"
                    >
                      <div class="m-1 ml-5 h-4 w-4 rounded-full bg-white"></div>
                    </div>

                    <div
                      v-if="client.enabled === false"
                      :title="$t('enableClient')"
                      class="mr-1 inline-block h-6 w-10 cursor-pointer rounded-full bg-gray-200 align-middle transition-all dark:bg-neutral-400 hover:bg-gray-300 dark:hover:bg-neutral-500"
                      @click="enableClient(client)"
                    >
                      <div class="m-1 h-4 w-4 rounded-full bg-white"></div>
                    </div>

                    <!-- Show QR -->

                    <button
                      :disabled="!client.downloadableConfig"
                      class="rounded bg-gray-100 p-2 align-middle transition dark:bg-neutral-600 dark:text-neutral-300"
                      :class="{
                        'hover:bg-red-800 dark:hover:bg-red-800 hover:text-white dark:hover:text-white': client.downloadableConfig,
                        'is-disabled': !client.downloadableConfig,
                      }"
                      :title="!client.downloadableConfig ? $t('noPrivKey') : $t('showQR')"
                      @click="qrcode = `./api/wireguard/client/${client.id}/qrcode.svg`"
                    >
                      <svg class="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                        />
                      </svg>
                    </button>

                    <!-- Download Config -->
                    <a
                      :disabled="!client.downloadableConfig"
                      :href="`./api/wireguard/client/${client.id}/configuration`"
                      :download="client.downloadableConfig ? 'configuration' : null"
                      class="inline-block rounded bg-gray-100 p-2 align-middle transition dark:bg-neutral-600 dark:text-neutral-300"
                      :class="{
                        'hover:bg-red-800 dark:hover:bg-red-800 hover:text-white dark:hover:text-white': client.downloadableConfig,
                        'is-disabled': !client.downloadableConfig,
                      }"
                      :title="!client.downloadableConfig ? $t('noPrivKey') : $t('downloadConfig')"
                      @click="
                        if (!client.downloadableConfig) {
                          $event.preventDefault();
                        }
                      "
                    >
                      <svg class="w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>

                    <!-- Delete -->

                    <button
                      class="rounded bg-gray-100 p-2 align-middle transition dark:bg-neutral-600 hover:bg-red-800 dark:text-neutral-300 hover:text-white dark:hover:bg-red-800 dark:hover:text-white"
                      :title="$t('deleteClient')"
                      @click="clientDelete = client"
                    >
                      <svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="clients && clients.length === 0">
              <p class="m-10 text-center text-sm text-gray-400 dark:text-neutral-400">
                {{ $t("noClients") }}<br /><br />
                <button
                  class="inline-flex items-center border-2 rounded border-none bg-red-800 px-4 py-2 text-white transition hover:bg-red-700"
                  @click="
                    clientCreate = true;
                    clientCreateName = '';
                  "
                >
                  <svg class="mr-2 w-4" inline xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span class="text-sm">{{ $t("newClient") }}</span>
                </button>
              </p>
            </div>
            <div v-if="clients === null" class="p-5 text-gray-200 dark:text-red-300">
              <svg class="mx-auto w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <!-- QR Code -->
        <div v-if="qrcode">
          <div class="fixed bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center bg-black bg-opacity-50">
            <div class="relative rounded-md bg-white p-8 shadow-lg">
              <button
                class="absolute right-4 top-4 text-gray-600 dark:text-neutral-500 hover:text-gray-800 dark:hover:text-neutral-700"
                @click="qrcode = null"
              >
                <svg class="w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img :src="qrcode" />
            </div>
          </div>
        </div>

        <!-- Create Dialog -->
        <div v-if="clientCreate" class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen flex items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-black dark:opacity-50"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 tranneutral-y-4 sm:tranneutral-y-0 sm:scale-95"
          To: "opacity-100 tranneutral-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 tranneutral-y-0 sm:scale-100"
          To: "opacity-0 tranneutral-y-4 sm:tranneutral-y-0 sm:scale-95"
      -->
            <div
              class="inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-lg dark:bg-neutral-700 sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pb-4 pt-5 dark:bg-neutral-700 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-full bg-red-800 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <svg
                      class="h-6 w-6 text-white"
                      inline
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div class="mt-3 flex-grow text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 id="modal-headline" class="text-lg text-gray-900 font-medium leading-6 dark:text-neutral-200">
                      {{ $t("newClient") }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        <input
                          v-model.trim="clientCreateName"
                          class="w-full border-2 border-gray-100 rounded p-2 outline-none dark:border-neutral-600 focus:border-gray-200 dark:bg-neutral-700 dark:text-neutral-200 focus:dark:border-neutral-500 dark:placeholder:text-neutral-400"
                          type="text"
                          :placeholder="$t('name')"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse dark:bg-neutral-700 sm:px-6">
                <button
                  v-if="clientCreateName.length > 0"
                  type="button"
                  class="w-full inline-flex justify-center border border-transparent rounded-md bg-red-800 px-4 py-2 text-base text-white font-medium shadow-sm sm:ml-3 sm:w-auto hover:bg-red-700 sm:text-sm focus:outline-none"
                  @click="
                    createClient();
                    clientCreate = null;
                  "
                >
                  {{ $t("create") }}
                </button>
                <button
                  v-else
                  type="button"
                  class="w-full inline-flex cursor-not-allowed justify-center border border-transparent rounded-md bg-gray-200 px-4 py-2 text-base text-white font-medium shadow-sm sm:ml-3 sm:w-auto dark:bg-neutral-400 sm:text-sm dark:text-neutral-300"
                >
                  {{ $t("create") }}
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center border border-gray-300 rounded-md bg-white px-4 py-2 text-base text-gray-700 font-medium shadow-sm sm:ml-3 sm:mt-0 sm:w-auto dark:border-neutral-500 dark:bg-neutral-500 hover:bg-gray-50 sm:text-sm dark:text-neutral-50 focus:outline-none dark:hover:border-neutral-600 dark:hover:bg-neutral-600"
                  @click="clientCreate = null"
                >
                  {{ $t("cancel") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Dialog -->
        <div v-if="clientDelete" class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen flex items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-black dark:opacity-50"></div>
            </div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 tranneutral-y-4 sm:tranneutral-y-0 sm:scale-95"
          To: "opacity-100 tranneutral-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 tranneutral-y-0 sm:scale-100"
          To: "opacity-0 tranneutral-y-4 sm:tranneutral-y-0 sm:scale-95"
      -->
            <div
              class="inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:max-w-lg dark:bg-neutral-700 sm:align-middle"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pb-4 pt-5 dark:bg-neutral-700 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto h-12 w-12 flex flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <!-- Heroicon name: outline/exclamation -->
                    <svg
                      class="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 id="modal-headline" class="text-lg text-gray-900 font-medium leading-6 dark:text-neutral-200">
                      {{ $t("deleteClient") }}
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500 dark:text-neutral-300">
                        {{ $t("deleteDialog1") }} <strong>{{ clientDelete.name }}</strong
                        >? {{ $t("deleteDialog2") }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse dark:bg-neutral-600 sm:px-6">
                <button
                  type="button"
                  class="w-full inline-flex justify-center border border-transparent rounded-md bg-red-600 px-4 py-2 text-base text-white font-medium shadow-sm sm:ml-3 sm:w-auto dark:bg-red-600 hover:bg-red-700 sm:text-sm dark:text-white focus:outline-none dark:hover:bg-red-700"
                  @click="
                    deleteClient(clientDelete);
                    clientDelete = null;
                  "
                >
                  {{ $t("deleteClient") }}
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center border border-gray-300 rounded-md bg-white px-4 py-2 text-base text-gray-700 font-medium shadow-sm sm:ml-3 sm:mt-0 sm:w-auto dark:border-neutral-500 dark:bg-neutral-500 hover:bg-gray-50 sm:text-sm dark:text-neutral-50 focus:outline-none dark:hover:border-neutral-600 dark:hover:bg-neutral-600"
                  @click="clientDelete = null"
                >
                  {{ $t("cancel") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="authenticated === false">
        <h1 class="my-16 text-center text-4xl text-gray-700 font-medium dark:text-neutral-200">
          <img src="/img/logo.png" width="32" class="dark:bg inline align-middle" />
          <span class="align-middle">WireGuard</span>
        </h1>

        <form class="mx-auto mt-10 w-64 overflow-hidden rounded-md bg-white p-5 shadow dark:bg-neutral-700" @submit="login">
          <!-- Avatar -->
          <div class="relative mx-auto mb-10 mt-5 h-20 w-20 overflow-hidden rounded-full bg-red-800 dark:bg-red-800">
            <svg
              class="m-5 h-10 w-10 text-white dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
          </div>

          <input
            v-model="password"
            type="password"
            name="password"
            :placeholder="$t('password')"
            class="mb-5 w-full border-2 border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-500 outline-none dark:border-neutral-800 focus:border-red-800 dark:bg-neutral-700 dark:text-gray-500 dark:focus:border-red-800 dark:placeholder:text-neutral-400"
          />

          <button
            v-if="authenticating"
            class="w-full cursor-not-allowed rounded bg-red-800 py-2 text-sm text-white shadow dark:bg-red-800 dark:text-white"
          >
            <svg class="mx-auto w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
          <input
            v-if="!authenticating && password"
            type="submit"
            class="w-full cursor-pointer rounded bg-red-800 py-2 text-sm text-white shadow transition dark:bg-red-800 hover:bg-red-700 dark:text-white dark:hover:bg-red-700"
            :value="$t('signIn')"
          />
          <input
            v-if="!authenticating && !password"
            type="submit"
            class="w-full cursor-not-allowed rounded bg-gray-200 py-2 text-sm text-white shadow dark:bg-neutral-800 dark:text-white"
            :value="$t('signIn')"
          />
        </form>
      </div>

      <div v-if="authenticated === null" class="pb-12 pt-24 text-gray-300 dark:text-red-300">
        <svg class="mx-auto w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>

    <p v-cloak class="m-10 text-center text-xs text-gray-300 dark:text-neutral-600">
      <a class="hover:underline" target="_blank" href="https://github.com/wg-easy/wg-easy">WireGuard Easy</a> © 2021-2024 by
      <a class="hover:underline" target="_blank" href="https://emilenijssen.nl/?ref=wg-easy">Emile Nijssen</a> is licensed under
      <a class="hover:underline" target="_blank" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a> ·
      <a class="hover:underline" href="https://github.com/sponsors/WeeJeWel" target="_blank">{{ $t("donate") }}</a>
    </p>
  </div>
</template>

<script lang="ts">
import VueApexCharts from "vue-apexcharts";
import { format as timeagoFormat } from "timeago.js";
import API from "./js/api";

const UI_CHART_TYPES = [
  { type: false, strokeWidth: 0 },
  { type: "line", strokeWidth: 3 },
  { type: "area", strokeWidth: 0 },
  { type: "bar", strokeWidth: 0 },
];

const CHART_COLORS = {
  rx: { light: "rgba(128,128,128,0.3)", dark: "rgba(255,255,255,0.3)" },
  tx: { light: "rgba(128,128,128,0.4)", dark: "rgba(255,255,255,0.3)" },
  gradient: { light: ["rgba(0,0,0,1.0)", "rgba(0,0,0,1.0)"], dark: ["rgba(128,128,128,0)", "rgba(128,128,128,0)"] },
};

export default {
  components: {
    Apexchart: VueApexCharts,
  },
  data() {
    return {
      authenticated: null,
      authenticating: false,
      password: null,
      requiresPassword: null,

      clients: null,
      clientsPersist: {},
      clientDelete: null,
      clientCreate: null,
      clientCreateName: "",
      clientEditName: null,
      clientEditNameId: null,
      clientEditAddress: null,
      clientEditAddressId: null,
      qrcode: null,

      currentRelease: null,
      latestRelease: null,

      uiTrafficStats: false,

      uiChartType: 0,
      uiShowCharts: localStorage.getItem("uiShowCharts") === "1",
      uiTheme: localStorage.theme || "auto",
      prefersDarkScheme: window.matchMedia("(prefers-color-scheme: dark)"),

      chartOptions: {
        chart: {
          background: "transparent",
          stacked: false,
          toolbar: {
            show: false,
          },
          animations: {
            enabled: false,
          },
          parentHeightOffset: 0,
          sparkline: {
            enabled: true,
          },
        },
        colors: [],
        stroke: {
          curve: "smooth",
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "vertical",
            shadeIntensity: 0,
            gradientToColors: CHART_COLORS.gradient[this.theme],
            inverseColors: false,
            opacityTo: 0,
            stops: [0, 100],
          },
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
          min: 0,
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        grid: {
          show: false,
          padding: {
            left: -10,
            right: 0,
            bottom: -15,
            top: -15,
          },
          column: {
            opacity: 0,
          },
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
      },
    };
  },
  computed: {
    chartOptionsTX() {
      const opts = {
        ...this.chartOptions,
        colors: [CHART_COLORS.tx[this.theme]],
      };
      opts.chart.type = UI_CHART_TYPES[this.uiChartType].type || false;
      opts.stroke.width = UI_CHART_TYPES[this.uiChartType].strokeWidth;
      return opts;
    },
    chartOptionsRX() {
      const opts = {
        ...this.chartOptions,
        colors: [CHART_COLORS.rx[this.theme]],
      };
      opts.chart.type = UI_CHART_TYPES[this.uiChartType].type || false;
      opts.stroke.width = UI_CHART_TYPES[this.uiChartType].strokeWidth;
      return opts;
    },
    updateCharts() {
      return this.uiChartType > 0 && this.uiShowCharts;
    },
    theme() {
      if (this.uiTheme === "auto") {
        return this.prefersDarkScheme.matches ? "dark" : "light";
      }
      return this.uiTheme;
    },
  },
  mounted() {
    this.prefersDarkScheme.addListener(this.handlePrefersChange);
    this.setTheme(this.uiTheme);

    this.api = new API();
    this.api
      .getSession()
      .then((session) => {
        this.authenticated = session.authenticated;
        this.requiresPassword = session.requiresPassword;
        this.refresh({
          updateCharts: this.updateCharts,
        }).catch((error) => {
          alert(error.message || error.toString());
        });
      })
      .catch((error) => {
        alert(error.message || error.toString());
      });

    setInterval(() => {
      this.refresh({
        updateCharts: this.updateCharts,
      }).catch(console.error);
    }, 1000);

    this.api
      .getuiTrafficStats()
      .then((res) => {
        this.uiTrafficStats = res;
      })
      .catch(() => {
        this.uiTrafficStats = false;
      });

    this.api
      .getChartType()
      .then((res) => {
        this.uiChartType = Number.parseInt(res, 10);
      })
      .catch(() => {
        this.uiChartType = 0;
      });

    Promise.resolve()
      .then(async () => {
        const currentRelease = await this.api.getRelease();
        const latestRelease = await fetch("https://wg-easy.github.io/wg-easy/changelog.json")
          .then(async (res) => res.json())
          .then((releases) => {
            const releasesArray = Object.entries(releases).map(([version, changelog]) => ({
              version: Number.parseInt(version, 10),
              changelog,
            }));
            releasesArray.sort((a, b) => {
              return b.version - a.version;
            });

            return releasesArray[0];
          });

        console.log(`Current Release: ${currentRelease}`);
        console.log(`Latest Release: ${latestRelease.version}`);

        if (currentRelease >= latestRelease.version) return;

        this.currentRelease = currentRelease;
        this.latestRelease = latestRelease;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    bytes(bytes: number, decimals = 2, kib = false, maxunit?: string) {
      if (bytes === 0) return "0 B";
      if (Number.isNaN(bytes) && !Number.isFinite(bytes)) return "NaN";
      const k = kib ? 1024 : 1000;
      const dm = decimals != undefined && !Number.isNaN(decimals) && decimals >= 0 ? decimals : 2;
      const sizes = kib
        ? ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB", "BiB"]
        : ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB", "BB"];
      let i = Math.floor(Math.log(bytes) / Math.log(k));
      if (maxunit !== undefined) {
        const index = sizes.indexOf(maxunit);
        if (index !== -1) i = index;
      }

      return `${Number.parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
    },
    timeago(value: Date) {
      return timeagoFormat(value, this.$i18n.locale);
    },
    dateTime: (value) => {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(value);
    },
    async refresh({ updateCharts = false } = {}) {
      if (!this.authenticated) return;

      const clients = await this.api.getClients();
      this.clients = clients.map((client) => {
        if (client.name.includes("@") && client.name.includes(".")) {
          client.avatar = `https://gravatar.com/avatar/${sha256(client.name.toLowerCase().trim())}.jpg`;
        }

        if (!this.clientsPersist[client.id]) {
          this.clientsPersist[client.id] = {};
          this.clientsPersist[client.id].transferRxHistory = Array.from({ length: 50 }).fill(0);
          this.clientsPersist[client.id].transferRxPrevious = client.transferRx;
          this.clientsPersist[client.id].transferTxHistory = Array.from({ length: 50 }).fill(0);
          this.clientsPersist[client.id].transferTxPrevious = client.transferTx;
        }

        // Debug
        // client.transferRx = this.clientsPersist[client.id].transferRxPrevious + Math.random() * 1000;
        // client.transferTx = this.clientsPersist[client.id].transferTxPrevious + Math.random() * 1000;
        // client.latestHandshakeAt = new Date();
        // this.requiresPassword = true;

        this.clientsPersist[client.id].transferRxCurrent = client.transferRx - this.clientsPersist[client.id].transferRxPrevious;
        this.clientsPersist[client.id].transferRxPrevious = client.transferRx;
        this.clientsPersist[client.id].transferTxCurrent = client.transferTx - this.clientsPersist[client.id].transferTxPrevious;
        this.clientsPersist[client.id].transferTxPrevious = client.transferTx;

        if (updateCharts) {
          this.clientsPersist[client.id].transferRxHistory.push(this.clientsPersist[client.id].transferRxCurrent);
          this.clientsPersist[client.id].transferRxHistory.shift();

          this.clientsPersist[client.id].transferTxHistory.push(this.clientsPersist[client.id].transferTxCurrent);
          this.clientsPersist[client.id].transferTxHistory.shift();

          this.clientsPersist[client.id].transferTxSeries = [
            {
              name: "Tx",
              data: this.clientsPersist[client.id].transferTxHistory,
            },
          ];

          this.clientsPersist[client.id].transferRxSeries = [
            {
              name: "Rx",
              data: this.clientsPersist[client.id].transferRxHistory,
            },
          ];

          client.transferTxHistory = this.clientsPersist[client.id].transferTxHistory;
          client.transferRxHistory = this.clientsPersist[client.id].transferRxHistory;
          client.transferMax = Math.max(...client.transferTxHistory, ...client.transferRxHistory);

          client.transferTxSeries = this.clientsPersist[client.id].transferTxSeries;
          client.transferRxSeries = this.clientsPersist[client.id].transferRxSeries;
        }

        client.transferTxCurrent = this.clientsPersist[client.id].transferTxCurrent;
        client.transferRxCurrent = this.clientsPersist[client.id].transferRxCurrent;

        client.hoverTx = this.clientsPersist[client.id].hoverTx;
        client.hoverRx = this.clientsPersist[client.id].hoverRx;

        return client;
      });
    },
    login(e) {
      e.preventDefault();

      if (!this.password) return;
      if (this.authenticating) return;

      this.authenticating = true;
      this.api
        .createSession({
          password: this.password,
        })
        .then(async () => {
          const session = await this.api.getSession();
          this.authenticated = session.authenticated;
          this.requiresPassword = session.requiresPassword;
          return this.refresh();
        })
        .catch((error) => {
          alert(error.message || error.toString());
        })
        .finally(() => {
          this.authenticating = false;
          this.password = null;
        });
    },
    logout(e) {
      e.preventDefault();

      this.api
        .deleteSession()
        .then(() => {
          this.authenticated = false;
          this.clients = null;
        })
        .catch((error) => {
          alert(error.message || error.toString());
        });
    },
    createClient() {
      const name = this.clientCreateName;
      if (!name) return;

      this.api
        .createClient({ name })
        .catch((error) => {
          alert(error.message || error.toString());
        })
        .finally(async () => this.refresh().catch(console.error));
    },
    deleteClient(client) {
      this.api
        .deleteClient({ clientId: client.id })
        .catch((error) => {
          alert(error.message || error.toString());
        })
        .finally(async () => this.refresh().catch(console.error));
    },
    enableClient(client) {
      this.api
        .enableClient({ clientId: client.id })
        .catch((error) => {
          alert(error.message || error.toString());
        })
        .finally(async () => this.refresh().catch(console.error));
    },
    disableClient(client) {
      this.api
        .disableClient({ clientId: client.id })
        .catch((error) => {
          alert(error.message || error.toString());
        })
        .finally(async () => this.refresh().catch(console.error));
    },
    updateClientName(client, name) {
      this.api
        .updateClientName({ clientId: client.id, name })
        .catch((error) => {
          alert(error.message || error.toString());
        })
        .finally(async () => this.refresh().catch(console.error));
    },
    updateClientAddress(client, address) {
      this.api
        .updateClientAddress({ clientId: client.id, address })
        .catch((error) => {
          alert(error.message || error.toString());
        })
        .finally(async () => this.refresh().catch(console.error));
    },
    toggleTheme() {
      const themes = ["light", "dark", "auto"];
      const currentIndex = themes.indexOf(this.uiTheme);
      const newIndex = (currentIndex + 1) % themes.length;
      this.uiTheme = themes[newIndex];
      localStorage.theme = this.uiTheme;
      this.setTheme(this.uiTheme);
    },
    setTheme(theme) {
      const { classList } = document.documentElement;
      const shouldAddDarkClass = theme === "dark" || (theme === "auto" && this.prefersDarkScheme.matches);
      classList.toggle("dark", shouldAddDarkClass);
    },
    handlePrefersChange(e) {
      if (localStorage.theme === "auto") {
        this.setTheme(e.matches ? "dark" : "light");
      }
    },
    toggleCharts() {
      localStorage.setItem("uiShowCharts", this.uiShowCharts ? 1 : 0);
    },
  },
};
</script>

<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: "bg-gray-50 dark:bg-neutral-800",
  },
  link: [
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
  ],
  meta: [
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black-translucent",
    },
  ],
  title: "WireGuard",
});
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
