import { renderHook } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react-native'
import * as Location from 'expo-location'

import { useThemeInitializer } from 'hooks/useThemeInitializer'
import { themes } from 'styles/themes'

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(() => Promise.resolve({ status: 'granted' })),
  getCurrentPositionAsync: jest.fn(() =>
    Promise.resolve({
      coords: { latitude: -23.55, longitude: -46.63 },
    }),
  ),
}))

jest.mock('utils/getSeasonByDateAndLocation', () => ({
  getSeasonByDateAndLocation: jest.fn(() => 'summer'),
}))

describe('useThemeInitializer', () => {
  it('should fetch location and set the correct seasonal theme', async () => {
    const mockSetTheme = jest.fn()

    renderHook(() => useThemeInitializer(mockSetTheme))

    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith(themes.summer)
    })
  })

  it('should fallback to summer if location permission is denied', async () => {
    ;(Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValueOnce({
      status: 'denied',
    })

    const mockSetTheme = jest.fn()

    renderHook(() => useThemeInitializer(mockSetTheme))

    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith(themes.summer)
    })
  })

  it('should fallback to summer if location request throws an error', async () => {
    ;(Location.getCurrentPositionAsync as jest.Mock).mockRejectedValueOnce(
      new Error('Location error'),
    )

    const mockSetTheme = jest.fn()

    renderHook(() => useThemeInitializer(mockSetTheme))

    await waitFor(() => {
      expect(mockSetTheme).toHaveBeenCalledWith(themes.summer)
    })
  })
})
