/**
 * Bitwig Studio supports automatic visual feedback from controllers that shows up as popup notifications. For
 * example when the selected track or the current device preset was changed on the controller, these
 * notifications are shown, depending on the configuration.
 *
 * It depends both on the users preference and the capabilities of the controller hardware if a certain
 * notification should be shown. This interface provides functions for enabling/disabling the various kinds of
 * automatic notifications from the hardware point of view. Typically, controllers that include an advanced
 * display don't need to show many notifications additionally on screen. For other controllers that do not
 * include a display it might be useful to show all notifications. By default all notifications are disabled.
 *
 * In addition, the user can enable or disable all notifications the have been enabled using this interface in
 * the preferences dialog of Bitwig Studio.
 *
 */
interface NotificationSettings {
    /**  Returns an object that reports if user notifications are enabled and that allows to enable/disable user
     * notifications from the control surface. If user notifications are disabled, no automatic notifications
     * will be shown in the Bitwig Studio user interface. If user notifications are enabled, all automatic
     * notifications will be shown that are enabled using the methods of this interface.
     * @returnType {SettableBooleanValue} a boolean value object */
    getUserNotificationsEnabled(): SettableBooleanValue;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown. By default this setting is `false`.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowSelectionNotifications(shouldShowNotifications: boolean): void;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown. By default this setting is `false`.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowChannelSelectionNotifications(shouldShowNotifications: boolean): void;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown. By default this setting is `false`.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowTrackSelectionNotifications(shouldShowNotifications: boolean): void;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown. By default this setting is `false`.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowDeviceSelectionNotifications(shouldShowNotifications: boolean): void;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown. By default this setting is `false`.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowDeviceLayerSelectionNotifications(shouldShowNotifications: boolean): void;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowPresetNotifications(shouldShowNotifications: boolean): void;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown. By default this setting is `false`.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowMappingNotifications(shouldShowNotifications: boolean): void;
    /**  Specifies if user notification related to selection changes should be shown. Please note that this
     * setting only applies when user notifications are enabled in general, otherwise no notification are
     * shown. By default this setting is `false`.
     * @param shouldShowNotifications
              `true` in case selection notifications should be shown, `false` otherwise. */
    setShouldShowValueNotifications(shouldShowNotifications: boolean): void;
}
