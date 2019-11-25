/** A special kind of selection cursor used for devices. */
interface CursorDevice extends Cursor, Device {
    /**  Returns the channel that this cursor device was created on. Currently this will always be a track or
     * cursor track instance.
     * @returnType {Channel} the track or cursor track object that was used for creation of this cursor device. */
    channel(): Channel;
    /**  Selects the parent device if there is any. */
    selectParent(): void;
    /**  Moves this cursor to the given device.
     * @param device
              the device that this cursor should point to */
    selectDevice(device: Device): void;
    /**  Selects the first device in the given channel.
     * @param channel
              the channel in which the device should be selected */
    selectFirstInChannel(channel: Channel): void;
    /**  Selects the last device in the given channel.
     * @param channel
              the channel in which the device should be selected */
    selectLastInChannel(channel: Channel): void;
    /**  Selects the first device in the nested FX slot with the given name.
     * @param chain
              the name of the FX slot in which the device should be selected */
    selectFirstInSlot(chain: string): void;
    /**  Selects the last device in the nested FX slot with the given name.
     * @param chain
              the name of the FX slot in which the device should be selected */
    selectLastInSlot(chain: string): void;
    /**  Selects the first device in the drum pad associated with the given key.
     * @param key
              the key associated with the drum pad in which the device should be selected */
    selectFirstInKeyPad(key: number): void;
    /**  Selects the last device in the drum pad associated with the given key.
     * @param key
              the key associated with the drum pad in which the device should be selected */
    selectLastInKeyPad(key: number): void;
    /**  Selects the first device in the nested layer with the given index.
     * @param index
              the index of the nested layer in which the device should be selected */
    selectFirstInLayer(index: number): void;
    /**  Selects the last device in the nested layer with the given index.
     * @param index
              the index of the nested layer in which the device should be selected */
    selectLastInLayer(index: number): void;
    /**  Selects the first device in the nested layer with the given name.
     * @param name
              the name of the nested layer in which the device should be selected */
    selectFirstInLayer(name: string): void;
    /**  Selects the last device in the nested layer with the given name.
     * @param name
              the name of the nested layer in which the device should be selected */
    selectLastInLayer(name: string): void;
}
