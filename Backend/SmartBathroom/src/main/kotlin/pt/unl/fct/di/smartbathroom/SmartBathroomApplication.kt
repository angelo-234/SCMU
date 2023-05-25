package pt.unl.fct.di.smartbathroom

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SmartBathroomApplication

fun main(args: Array<String>) {
	runApplication<SmartBathroomApplication>(*args)
}
