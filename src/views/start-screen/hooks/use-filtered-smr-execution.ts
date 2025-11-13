'use client'

import { useMemo } from 'react'
import { useStartSmrExecution } from './api/use-start-smr-execution'
import { useFiltersStore } from '@/shared/store'
import { ALL_ROADS, ALL_TYPES_OF_WORK } from '@/shared/lib/const'
import { roads } from '@/shared/lib/data'

export function useFilteredSmrExecution() {
  const { year, road, typeOfWork } = useFiltersStore()

  // Получаем ID дороги из названия
  const railwayId = useMemo(() => {
    if (!road || road === ALL_ROADS) {
      return null
    }
    const roadItem = roads.find((r) => r.name === road)
    return roadItem?.id ?? null
  }, [road])

  // Преобразуем год в число
  const yearNumber = useMemo(() => {
    return year ? parseInt(year, 10) : null
  }, [year])

  // Определяем repairName для запроса
  const repairName = useMemo(() => {
    if (!typeOfWork || typeOfWork === ALL_TYPES_OF_WORK) {
      return ALL_TYPES_OF_WORK
    }
    return typeOfWork
  }, [typeOfWork])

  // Получаем данные с сервера (уже отфильтрованные по году, дороге и типу работ)
  const { data, isLoading } = useStartSmrExecution(
    yearNumber,
    railwayId,
    repairName
  )

  // Обрабатываем данные: если не выбрана дорога, суммируем данные по всем дорогам
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return null

    // Если одна запись, возвращаем её
    if (data.length === 1) {
      return data[0]
    }

    // Если несколько записей (не выбрана дорога), суммируем все значения
    const firstItem = data[0]
    const aggregated = data.reduce(
      (acc, item) => {
        return {
          work_in_progress_cnt_plan:
            acc.work_in_progress_cnt_plan + item.work_in_progress_cnt_plan,
          work_in_progress_cnt_fact:
            acc.work_in_progress_cnt_fact + item.work_in_progress_cnt_fact,
          work_in_progress_distance_plan:
            acc.work_in_progress_distance_plan +
            item.work_in_progress_distance_plan,
          work_in_progress_distance_fact:
            acc.work_in_progress_distance_fact +
            item.work_in_progress_distance_fact,
          work_completed_cnt_plan:
            acc.work_completed_cnt_plan + item.work_completed_cnt_plan,
          work_completed_cnt_fact:
            acc.work_completed_cnt_fact + item.work_completed_cnt_fact,
          work_completed_distance_plan:
            acc.work_completed_distance_plan +
            item.work_completed_distance_plan,
          work_completed_distance_fact:
            acc.work_completed_distance_fact +
            item.work_completed_distance_fact,
          pu48_cnt_plan: acc.pu48_cnt_plan + item.pu48_cnt_plan,
          pu48_cnt_fact: acc.pu48_cnt_fact + item.pu48_cnt_fact,
          pu48_distance_plan: acc.pu48_distance_plan + item.pu48_distance_plan,
          pu48_distance_fact: acc.pu48_distance_fact + item.pu48_distance_fact,
          act_fsu_cnt_plan: acc.act_fsu_cnt_plan + item.act_fsu_cnt_plan,
          act_fsu_cnt_fact: acc.act_fsu_cnt_fact + item.act_fsu_cnt_fact,
          act_fsu_distance_plan:
            acc.act_fsu_distance_plan + item.act_fsu_distance_plan,
          act_fsu_distance_fact:
            acc.act_fsu_distance_fact + item.act_fsu_distance_fact,
        }
      },
      {
        work_in_progress_cnt_plan: 0,
        work_in_progress_cnt_fact: 0,
        work_in_progress_distance_plan: 0,
        work_in_progress_distance_fact: 0,
        work_completed_cnt_plan: 0,
        work_completed_cnt_fact: 0,
        work_completed_distance_plan: 0,
        work_completed_distance_fact: 0,
        pu48_cnt_plan: 0,
        pu48_cnt_fact: 0,
        pu48_distance_plan: 0,
        pu48_distance_fact: 0,
        act_fsu_cnt_plan: 0,
        act_fsu_cnt_fact: 0,
        act_fsu_distance_plan: 0,
        act_fsu_distance_fact: 0,
      }
    )

    // Пересчитываем проценты на основе суммированных значений
    const workInProgressPerc =
      aggregated.work_in_progress_distance_plan > 0
        ? (aggregated.work_in_progress_distance_fact /
            aggregated.work_in_progress_distance_plan) *
          100
        : 0

    const workCompletedPerc =
      aggregated.work_completed_distance_plan > 0
        ? (aggregated.work_completed_distance_fact /
            aggregated.work_completed_distance_plan) *
          100
        : 0

    const pu48Perc =
      aggregated.pu48_distance_plan > 0
        ? (aggregated.pu48_distance_fact / aggregated.pu48_distance_plan) * 100
        : 0

    const actFsuPerc =
      aggregated.act_fsu_distance_plan > 0
        ? (aggregated.act_fsu_distance_fact /
            aggregated.act_fsu_distance_plan) *
          100
        : 0

    return {
      ...firstItem,
      railway_id: 0, // Для агрегированных данных
      railway_name: ALL_ROADS,
      ...aggregated,
      work_in_progress_perc: workInProgressPerc,
      work_completed_perc: workCompletedPerc,
      pu48_perc: pu48Perc,
      act_fsu_perc: actFsuPerc,
    }
  }, [data])

  return {
    data: filteredData,
    isLoading,
  }
}
