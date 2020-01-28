import XBeeDevice

PORT = "/dev/ttyAMA0"
BAUD_RATE = 9600

zigbee = XBeeDevice(PORT, BAUD_RATE)
zigbee.open()

xbee_message = device.read_data()
print (xbee_message)

zigbee.clode()
