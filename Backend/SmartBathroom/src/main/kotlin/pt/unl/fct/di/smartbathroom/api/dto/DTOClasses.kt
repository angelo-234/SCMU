package pt.unl.fct.di.smartbathroom.api.dto

import pt.unl.fct.di.smartbathroom.domain.BathroomDAO
import pt.unl.fct.di.smartbathroom.domain.SlotsDAO

data class BathroomDTO(
        val id: Long,
        val slots: MutableCollection<SlotsDAO>,
        val temperatureThreshold: Long,
        val humidityThreshold: Long,
        var desembacador: Boolean,
        var aquecedor: Boolean,
        var currentTemperature: Long,
        var doorOpen: Boolean
) {
    constructor(bathroomDAO: BathroomDAO): this(
            bathroomDAO.id,
            bathroomDAO.slots,
            bathroomDAO.temperatureThreshold,
            bathroomDAO.humidityThreshold,
            bathroomDAO.desembacador,
            bathroomDAO.aquecedor,
            bathroomDAO.currentTemperature,
            bathroomDAO.doorOpen
    )
}

data class SlotDTO(
        val id: Long,
        val bathroomId: Long,
        val start: Double,
        val end: Double,
        var avai: Boolean,
        val code: String
){
    constructor(slotsDAO: SlotsDAO): this(
            slotsDAO.id,
            slotsDAO.bathroomId,
            slotsDAO.start,
            slotsDAO.end,
            slotsDAO.avai,
            slotsDAO.code
    )
}